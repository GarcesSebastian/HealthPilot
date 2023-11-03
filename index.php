<?php
session_start();
include("./database/iniciar.php");

if(isset($_SESSION['id'])){
    $id = $_SESSION['id'];

    $getStateUser = "SELECT estado FROM estados WHERE id = '$id'";
    $resultGetStateUser = mysqli_query($conex, $getStateUser);

    if(mysqli_num_rows($resultGetStateUser) > 0){
        $row = mysqli_fetch_assoc($resultGetStateUser);
        $state = $row['estado'];

        if($state){
            header("Location: ./public/page/home/index.php");
        }
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="../project Pagina/font/fontawesome-free-6.4.0-web/css/fontawesome.min.css">
    <script src="https://kit.fontawesome.com/7a00fb587a.js" crossorigin="anonymous"></script>
    <title>Inicio</title>
</head>
<body>

    <div class="containerAll">

        <div class="contentView">
            <span class="logoPage">
                <img src="./img/logo.png" class="imageLogo">
            </span>

            <h1 class="namePage">
                HealthPilot
            </h1>

            <p class="descriptionPage">
                Simplifica tu cuidado de la salud con HealthPilot. Registra y recuerda tus medicamentos de manera eficiente.
            </p>

            <input type="button" value="LETS START" class="buttonStart">

            <span class="chart"></span>
            <span class="chart-circle"></span>
            <span class="circle"></span>

        </div>


    </div>
    

    <script src="script.js"></script>
</body>
</html>