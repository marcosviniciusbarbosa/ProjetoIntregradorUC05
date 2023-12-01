<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER["REQUEST_METHOD"];
include("connection.php");

if ($method == "GET") {
    if (!isset($_GET["id_usuario"])) {
        try {
            $sql = "SELECT * FROM usuarios";

            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $dados = $stmt->fetchall(PDO::FETCH_OBJ);

            $result["usuarios"] = $dados;
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
            if (empty($_GET["id_usuario"]) || !is_numeric($_GET["id_usuario"])) {
                // está vazio ou não é numérico : ERRO
                throw new ErrorException("Valor inválido", 1);
            }
            $id_usuario = $_GET["id_usuario"];

            $sql = "SELECT * FROM usuarios
                    WHERE id_usuario =:id_usuario";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id_usuario", $id_usuario);
            $stmt->execute();

            $dado = $stmt->fetch(PDO::FETCH_OBJ);
            $result['usuario'] = $dado;
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
    $e_mail = trim($dados->e_mail); // acessa valor de um OBJETO
    $senha = trim($dados->senha); // acessa valor de um OBJETO
    $id_pessoa = trim($dados->id_pessoa); // acessa valor de um OBJETO
    $nivel = trim($dados->nivel); // acessa valor de um OBJETO

    try {
        if (empty($e_mail) || empty($senha) || empty($id_pessoa) || empty($nivel)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }
        $sql = "INSERT INTO usuarios(e_mail, senha, id_pessoa, nivel)
                VALUES (:e_mail, :senha, :id_pessoa, :nivel)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":e_mail", $e_mail);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":id_pessoa", $id_pessoa);
        $stmt->bindParam(":nivel", $nivel);
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
    $id_usuario = trim($dados->id_usuario);
    $e_mail = trim($dados->e_mail); // acessa valor de um OBJETO
    $senha = trim($dados->senha); // acessa valor de um OBJETO
    $id_pessoa = trim($dados->id_pessoa); // acessa valor de um OBJETO
    $nivel = trim($dados->nivel); // acessa valor de um OBJETO

    try {
        if (empty($e_mail) || empty($senha) || empty($id_pessoa) || empty($nivel)) {
            // está vazio  : ERRO
            throw new ErrorException("Campo não preenchido!", 1);
        }

        $sql = "UPDATE usuarios
                    SET e_mail=:e_mail, senha=:senha, id_pessoa=:id_pessoa, nivel=:nivel
                    WHERE id_usuario=:id_usuario";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_usuario", $id_usuario);
        $stmt->bindParam(":e_mail", $e_mail);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":id_pessoa", $id_pessoa);
        $stmt->bindParam(":nivel", $nivel);
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

        if (empty($_GET["id_usuario"]) || !is_numeric($_GET["id_usuario"])) {
            // está vazio ou não é numérico : ERRO
            throw new ErrorException("Valor inválido", 1);
        }
        $id_usuario = $_GET["id_usuario"];

        $sql = "DELETE FROM usuarios
                WHERE id_usuario=:id_usuario";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_usuario", $id_usuario);
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