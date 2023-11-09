<?php

$email = $_POST["email"];
$password = $_POST["password"];

if(empty($email) || empty($password)) {
    header("location: login.php");
}

$password = hash('sha256', $password);

$end_point = "http://localhost/api_back/login/get.php?email=$email&password=$password";

$curl = curl_init($end_point);

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $end_point
]);

$response = curl_exec($curl);

curl_close($curl);

$dado = json_decode($response, true);

if($dado["status"]=='fail'){
    $msg="Falha no processo de login. Tente novamente";
    $status="fail";
    header("location: login.php?msg=$msg&status=$status");
    exit;
}

session_start();
$_SESSION["autenticacao"] = true;
$_SESSION["email"] = $email;
$msg="Login efetuado com sucesso!";
$status="success";
header("location: index.php?msg=$msg&status=$status");
exit;

?>