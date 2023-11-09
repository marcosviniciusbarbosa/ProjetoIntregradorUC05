<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER["REQUEST_METHOD"];
include("../connection/connection.php");

if ($method == "GET") {
    // echo "GET";

    if (!isset($_GET["id"])) {

        try {

            $sql = "SELECT pk_id, unidade, atualiza
                    FROM unidades";
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $dados = $stmt->fetchAll(PDO::FETCH_OBJ);

            // echo "<pre>";
            // var_dump($dados);
            // echo "</pre>";

            $result["unidades"] = $dados;
            $result["status"] = "success";

            http_response_code(200);

        } catch (PDOException $ex) {
            //echo "error: ".$ex->getMessage();
            $result = ["status" => "fail", "error" => $ex->getMessage()];
            http_response_code(200);
        } finally {
            $conn = null;
            echo json_encode($result);
        }
    } else {
        try {
            if (empty($_GET["id"]) || !is_numeric($_GET["id"])) {
                throw new ErrorException("Valor inválido", 1);
            }

            $id = $_GET["id"];

            $sql = "SELECT pk_id, unidade, atualiza
                    FROM unidades
                    WHERE pk_id=:id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            $dados = $stmt->fetch(PDO::FETCH_OBJ);

            $result["unidades"] = $dados;
            $result["status"] = "success";

        } catch (PDOException $ex) {
            $result = ["status" => "fail", "error" => $ex->getMessage()];
            http_response_code(200);
        } catch (Exception $ex) {
            $result = ["status" => "fail", "error" => $ex->getMessage()];
            http_response_code(200);
        } finally {
            $conn = null;
            echo json_encode($result);
        }
    }
}

if ($method == "POST") {
    echo "POST";
}

if ($method == "PUT") {
    echo "PUT";
}

if ($method == "DELETE") {
    echo "DELETE";
}


?>