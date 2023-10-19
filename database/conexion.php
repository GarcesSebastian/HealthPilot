<?php

    $hostname = "localhost";
    $password = "";
    $username = "root";
    $database = "dsi";

    $conex = mysqli_connect($hostname, $username, $password, $database);

    if($conex->connect_error){
        echo "Conexion fallida " . $conex->connect_error;
    }

?>