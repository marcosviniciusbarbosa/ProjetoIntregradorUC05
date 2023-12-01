<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER["REQUEST_METHOD"];
include("connection.php");

if ($method == "GET") {
    if (!isset($_GET["id_pessoa"])) {
        try {
            $sql = "SELECT * FROM pessoas";

            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $dados = $stmt->fetchall(PDO::FETCH_OBJ);

            $result["pessoas"] = $dados;
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
            if (empty($_GET["id_pessoa"]) || !is_numeric($_GET["id_pessoa"])) {
                // está vazio ou não é numérico : ERRO
                throw new ErrorException("Valor inválido", 1);
            }
            $id_pessoa = $_GET["id_pessoa"];

            $sql = "SELECT * FROM pessoas
                    WHERE id_pessoa =:id_pessoa";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id_pessoa", $id_pessoa);
            $stmt->execute();

            $dado = $stmt->fetch(PDO::FETCH_OBJ);
            $result['pessoa'] = $dado;
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
    $cpf = trim($dados->cpf); // acessa valor de um OBJETO
    $telefone = trim($dados->telefone); // acessa valor de um OBJETO
    $rua = trim($dados->rua); // acessa valor de um OBJETO
    $numero = trim($dados->numero); // acessa valor de um OBJETO
    $bairro = trim($dados->bairro); // acessa valor de um OBJETO
    $cep = trim($dados->cep); // acessa valor de um OBJETO
    $cidade = trim($dados->cidade); // acessa valor de um OBJETO

    try {
        if (empty($nome) || empty($telefone)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }
        $sql = "INSERT INTO pessoas(nome, cpf, telefone, rua, numero, bairro, cep, cidade)
                VALUES (:nome, :cpf, :telefone, :rua, :numero, :bairro, :cep, :cidade)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":cpf", $cpf);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":rua", $rua);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":bairro", $bairro);
        $stmt->bindParam(":cep", $cep);
        $stmt->bindParam(":cidade", $cidade);
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
    $id_pessoa = trim($dados->id_pessoa);
    $nome = trim($dados->nome); // acessa valor de um OBJETO
    $cpf = trim($dados->cpf); // acessa valor de um OBJETO
    $telefone = trim($dados->telefone); // acessa valor de um OBJETO
    $rua = trim($dados->rua); // acessa valor de um OBJETO
    $numero = trim($dados->numero); // acessa valor de um OBJETO
    $bairro = trim($dados->bairro); // acessa valor de um OBJETO
    $cep = trim($dados->cep); // acessa valor de um OBJETO
    $cidade = trim($dados->cidade); // acessa valor de um OBJETO

    try {
        if (empty($nome) || empty($telefone)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }

        $sql = "UPDATE pessoas
                    SET nome=:nome, cpf=:cpf, telefone=:telefone, rua=:rua, numero=:numero, bairro=:bairro, cep=:cep, cidade=:cidade
                    WHERE id_pessoa=:id_pessoa";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_pessoa", $id_pessoa);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":cpf", $cpf);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":rua", $rua);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":bairro", $bairro);
        $stmt->bindParam(":cep", $cep);
        $stmt->bindParam(":cidade", $cidade);
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

        if (empty($_GET["id_pessoa"]) || !is_numeric($_GET["id_pessoa"])) {
            // está vazio ou não é numérico : ERRO
            throw new ErrorException("Valor inválido", 1);
        }
        $id_pessoa = $_GET["id_pessoa"];

        $sql = "DELETE FROM pessoas
                WHERE id_pessoa=:id_pessoa";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_pessoa", $id_pessoa);
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