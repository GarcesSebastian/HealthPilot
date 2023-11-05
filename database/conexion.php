<?php

    $servername = "localhost";
    $password = "";
    $username = "root";
    $database = "healthpilot";

    $conex = mysqli_connect($servername, $username, $password, $database);

    if($conex->connect_error){
        echo "Conexion fallida " . $conex->connect_error;
    }

?>