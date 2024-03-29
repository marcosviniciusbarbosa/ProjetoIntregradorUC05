<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $method = $_SERVER["REQUEST_METHOD"];
    include("../connection/connection.php");

    // if (tem token?)
        // sim - consulta banco de dados 
            // if (Esse token existe?)
                //sim - acesso autorizado


                // não - bloqueia o acesso
        // não- bloqueia o acesso
    if($method == "GET"){
        //echo "GET";

        if (!isset($_GET["id"])){

            // listar todos os registros
            try {
                
                $sql = "SELECT pk_id, e_mail, habilita 
                        FROM usuarios";
                $stmt = $conn->prepare($sql);
                $stmt->execute();

                $dados = $stmt->fetchall(PDO::FETCH_OBJ);

                $result["usuarios"]=$dados;
                $result["status"] = "success";

                http_response_code(200);

            } catch (PDOException $ex) {
                // echo "error: ". $ex->getMEssage();
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }finally{
                $conn = null;
                echo json_encode($result);
            }
        }else{
            // listar um registro
            try{

                if(empty($_GET["id"]) || !is_numeric($_GET["id"])){
                    // está vazio ou não é numérico : ERRO
                    throw new ErrorException("Valor inválido", 1);
                }
                $id = $_GET["id"];

                $sql = "SELECT pk_id, e_mail, habilita 
                        FROM usuarios 
                        WHERE pk_id=:id";
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();

                $dado = $stmt->fetch(PDO::FETCH_OBJ);
                $result['usuarios'] = $dado;
                $result["status"] = "success";

            }catch(PDOException $ex){
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }catch(Exception $ex){
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }finally{
                $conn = null;
                echo json_encode($result);
            }
            
        }

       
    }
    if($method=="POST"){
       
        // recupera dados do corpo (body) de uma requisão POST
        $dados = file_get_contents("php://input");

        // decodifica JSON, sem opção TRUE
        $dados = json_decode($dados); // isso retorna um OBJETO

        // função trim retira espaços que estão sobrando
        $email = trim($dados->email); // acessa valor de um OBJETO
        $senha = trim($dados->senha); // acessa valor de um OBJETO
        $habilita = trim($dados->habilita); // acessa valor de um OBJETO

        try {
            if(empty($email) ){
                // está vazio  : ERRO
                throw new ErrorException("Email inválido", 1);
            }
            
            $sql = "INSERT INTO usuarios(e_mail, senha, habilita) 
                    VALUES (:email, :senha, :habilita)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":senha", $senha);
            $stmt->bindParam(":habilita", $habilita);
            $stmt->execute();

            $result = array("status"=>"success");

        } catch (PDOException $ex) {
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }catch(Exception $ex){
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }finally{
            $conn = null;
            echo json_encode($result);
        }



    }
    if($method=="PUT"){
        // recupera dados do corpo (body) de uma requisão POST
        $dados = file_get_contents("php://input");

        // decodifica JSON, sem opção TRUE
        $dados = json_decode($dados); // isso retorna um OBJETO

        // função trim retira espaços que estão sobrando
         $email = trim($dados->email); // acessa valor de um OBJETO
         $senha = trim($dados->senha); // acessa valor de um OBJETO
         $habilita = trim($dados->habilita); // acessa valor de um OBJETO
         $id = trim($dados->id); // acessa valor de um OBJETO
       
        try {
            if(empty($email) ){
                // está vazio  : ERRO
                throw new ErrorException("E-mail inválido", 1);
            }
            
            if (!empty($senha)){
                $sql = "UPDATE usuarios SET e_mail=:email, senha=:senha, habilita=:habilita 
                        WHERE pk_id=:id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":email", $email);
                $stmt->bindParam(":senha", $senha);
                $stmt->bindParam(":habilita", $habilita);
                $stmt->bindParam(":id", $id);

            }else{
                $sql = "UPDATE usuarios SET e_mail=:email, habilita=:habilita 
                        WHERE pk_id=:id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":email", $email);
                $stmt->bindParam(":habilita", $habilita);
                $stmt->bindParam(":id", $id);
            }
            
            $stmt->execute();

            $result = array("status"=>"success");

        } catch (PDOException $ex) {
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }catch(Exception $ex){
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }finally{
            $conn = null;
            echo json_encode($result);
        }

    }
    if($method=="DELETE"){
        try{

            if(empty($_GET["id"]) || !is_numeric($_GET["id"])){
                // está vazio ou não é numérico : ERRO
                throw new ErrorException("Valor inválido", 1);
            }
            $id = $_GET["id"];

            $sql= "DELETE FROM usuarios  
                    WHERE pk_id=:id";
            
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            
            $result["status"] = "success";

        }catch(PDOException $ex){
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }catch(Exception $ex){
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }finally{
            $conn = null;
            echo json_encode($result);
        }
     
    }







?>