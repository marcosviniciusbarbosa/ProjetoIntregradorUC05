<?php

$host = "localhost";
$db_name = "projeto_back";
$user = "root";
$password = "";

try {
    $conn = new PDO("mysql:host={$host}; dbname={$db_name}", $user, $password);
    // echo "Connection successful";
} catch (PDOException $ex) {
    die("Connection error: " . $ex->getMessage());
}

?>