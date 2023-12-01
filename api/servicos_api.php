<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER["REQUEST_METHOD"];
include("connection.php");

if ($method == "GET") {
    if (!isset($_GET["id_servico"])) {
        try {
            $sql = "SELECT * FROM servicos";

            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $dados = $stmt->fetchall(PDO::FETCH_OBJ);

            $result["servicos"] = $dados;
            $result["status"] = "success";

            http_response_code(200);

        } catch (PDOException $ex) {
            // echo "error: ". $ex->getMEssage();
            $result = ["status" => "fail", "error" => $ex->getMEssage()];
            http_response_code(200);
        } finally {
            $conn = null;
            echo json_encode($result);
        }
    } else {
        try {
            if (empty($_GET["id_servico"]) || !is_numeric($_GET["id_servico"])) {
                // está vazio ou não é numérico : ERRO
                throw new ErrorException("Valor inválido", 1);
            }
            $id_servico = $_GET["id_servico"];

            $sql = "SELECT * FROM servicos
                    WHERE id_servico =:id_servico";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id_servico", $id_servico);
            $stmt->execute();

            $dado = $stmt->fetch(PDO::FETCH_OBJ);
            $result['servico'] = $dado;
            $result["status"] = "success";

        } catch (PDOException $ex) {
            $result = ["status" => "fail", "error" => $ex->getMEssage()];
            http_response_code(200);
        } catch (Exception $ex) {
            $result = ["status" => "fail", "error" => $ex->getMEssage()];
            http_response_code(200);
        } finally {
            $conn = null;
            echo json_encode($result);
        }

    }
}

if ($method == "POST") {
    // recupera dados do corpo (body) de uma requisão POST
    $dados = file_get_contents("php://input");

    // decodifica JSON, sem opção TRUE
    $dados = json_decode($dados); // isso retorna um OBJETO

    // função trim retira espaços que estão sobrando
    $nome = trim($dados->nome); // acessa valor de um OBJETO
    $descricao = trim($dados->descricao); // acessa valor de um OBJETO
    $valor = trim($dados->valor); // acessa valor de um OBJETO
    $duracao = trim($dados->duracao); // acessa valor de um OBJETO
    $categoria = trim($dados->categoria); // acessa valor de um OBJETO
    $foto = trim($dados->foto); // acessa valor de um OBJETO

    try {
        if (empty($nome) || empty($descricao) || empty($valor) || empty($duracao) || empty($categoria) || empty($foto)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }
        $sql = "INSERT INTO servicos(nome, descricao, valor, duracao, categoria, foto)
                VALUES (:nome, :descricao, :valor, :duracao, :categoria, :foto)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":descricao", $descricao);
        $stmt->bindParam(":valor", $valor);
        $stmt->bindParam(":duracao", $duracao);
        $stmt->bindParam(":categoria", $categoria);
        $stmt->bindParam(":foto", $foto);
        $stmt->execute();

        $result = array("status" => "success");

    } catch (PDOException $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } catch (Exception $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } finally {
        $conn = null;
        echo json_encode($result);
    }
}

if ($method == "PUT") {
    // recupera dados do corpo (body) de uma requisão POST
    $dados = file_get_contents("php://input");

    // decodifica JSON, sem opção TRUE
    $dados = json_decode($dados); // isso retorna um OBJETO

    // função trim retira espaços que estão sobrando
    $id_servico = trim($dados->id_servico);
    $nome = trim($dados->nome); // acessa valor de um OBJETO
    $descricao = trim($dados->descricao); // acessa valor de um OBJETO
    $valor = trim($dados->valor); // acessa valor de um OBJETO
    $duracao = trim($dados->duracao); // acessa valor de um OBJETO
    $categoria = trim($dados->categoria); // acessa valor de um OBJETO
    $foto = trim($dados->foto); // acessa valor de um OBJETO

    try {
        if (empty($nome) || empty($descricao) || empty($valor) || empty($duracao) || empty($categoria) || empty($foto)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }
        $sql = "UPDATE
                    servicos
                SET
                    nome = :nome,
                    descricao = :descricao,
                    valor = :valor,
                    duracao = :duracao,
                    categoria = :categoria,
                    foto = :foto
                WHERE
                    id_servico = :id_servico";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_servico", $id_servico);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":descricao", $descricao);
        $stmt->bindParam(":valor", $valor);
        $stmt->bindParam(":duracao", $duracao);
        $stmt->bindParam(":categoria", $categoria);
        $stmt->bindParam(":foto", $foto);
        $stmt->execute();

        $result = array("status" => "success");

    } catch (PDOException $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } catch (Exception $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } finally {
        $conn = null;
        echo json_encode($result);
    }

}

if ($method == "DELETE") {
    try {

        if (empty($_GET["id_servico"]) || !is_numeric($_GET["id_servico"])) {
            // está vazio ou não é numérico : ERRO
            throw new ErrorException("Valor inválido", 1);
        }
        $id_servico = $_GET["id_servico"];

        $sql = "DELETE FROM servicos
                WHERE id_servico=:id_servico";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_servico", $id_servico);
        $stmt->execute();

        $result["status"] = "success";

    } catch (PDOException $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } catch (Exception $ex) {
        $result = ["status" => "fail", "error" => $ex->getMEssage()];
        http_response_code(200);
    } finally {
        $conn = null;
        echo json_encode($result);
    }

}
?>