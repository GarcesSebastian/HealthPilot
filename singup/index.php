<?php
session_start();
include("../database/iniciar.php");

$message;

function showSpawnAlert($message) {
    $spawn = <<<HTML
    <div class="spawnAlert" id="spawnAlert">
        $message
    </div>
    HTML;
    echo $spawn;
}


if(isset($_SESSION['id'])){
    $id = $_SESSION['id'];

    $getStateUser = "SELECT estado FROM estados WHERE id = '$id'";
    $resultGetStateUser = mysqli_query($conex, $getStateUser);

    if(mysqli_num_rows($resultGetStateUser) > 0){
        $row = mysqli_fetch_assoc($resultGetStateUser);
        $state = $row['estado'];

        if($state){
            header("Location: ../public/page/home/index.php");
        }
    }
}

if (isset($_POST['buttonSingUp'])) {
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    $email = $_POST['email'];

    if (empty($username) || empty($password) || empty($email)) {
        $message = "Por favor, complete todos los campos.";
        showSpawnAlert($message);
        $message = "";
    } else {
        if (strlen($username) <= 18) {
            $query = "SELECT * FROM registros WHERE usuario = '$username'";
            $result = mysqli_query($conex, $query);
            if (mysqli_num_rows($result) > 0) {
                $message = "El nombre de usuario ya está en uso.";
                showSpawnAlert($message);
                $message = "";
            } else {

                $confirmEmail = "SELECT * FROM registros WHERE email = '$email'";
                $resultConfirmEmail = mysqli_query($conex, $confirmEmail);
                
                if(mysqli_num_rows($resultConfirmEmail)>0){
                    $message = "Este correo electrónico ya se encuentra registrado.";
                    showSpawnAlert($message);
                    $message = "";
                }else{
                    
                    $id;

                    do{
                        $id = rand(0,999999);
                        $verifyID = "SELECT id FROM registros WHERE id = '$id'";
                        $resultVerifyID = mysqli_query($conex, $verifyID);
                    }while(mysqli_num_rows($resultVerifyID) > 0);

                    $state = false;
    
                    $sendData = "INSERT INTO registros ( id , usuario , contraseña , email ) VALUES ('$id','$username','$password','$email')";
                    $sql = mysqli_query($conex, $sendData);
    
                    $sendState = "INSERT INTO estados ( id , estado) VALUES ('$id','$state')";
                    $sqlSendState = mysqli_query($conex, $sendState);
    
                    $sendInfoMedica = "INSERT INTO informacion_medica (id, email) VALUES ('$id','$email')";
                    $sqlSendInfoMedica = mysqli_query($conex,$sendInfoMedica);
    
                    if($sql and $sqlSendState and $sqlSendInfoMedica){
                        header("Location: ../login/index.php");
                    }else{
                        echo $sql;
                    }    
                }
            }
        } else {
            $message = "Máximo 18 caracteres para el nombre de usuario.";
            showSpawnAlert($message);
            $message = "";
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
    <link rel="stylesheet" href="../public/styles/queries.css">
    <link rel="stylesheet" href="../project Pagina/font/fontawesome-free-6.4.0-web/css/fontawesome.min.css">
    <script src="https://kit.fontawesome.com/7a00fb587a.js" crossorigin="anonymous"></script>
    <title>SingUp</title>
</head>
<style>
    .spawnAlert{
        position: absolute;
        bottom:15%;
        width: fit-content;
        height: fit-content;
        z-index: 10;
        color: tomato;
        transition: .3s ease-in-out;
        display: flex;
        padding:0 5%;
        font-weight:bolder;
        font-size:14px;
    }
</style>
<body>

    <div class="containerAll">

        <div class="contentView">

            <form action="./index.php" method="post">
            <div class="contentLogin">
                <span class="logoPage">
                    <img src="../img/logo.png" class="imageLogo">
                </span>

                <div class="contentForm">
                    <div class="username">
                        <span class="userLogo">
                            <i class="fa-regular fa-user fa-lg"></i>
                        </span>
                        <input type="text" name="username" id="username" placeholder="Usuario" required>
                    </div>

                    <div class="password">
                        <span class="keyLogo">
                            <i class="fa-solid fa-key fa-lg"></i>
                        </span>
                        <input type="password" name="password" id="password" placeholder="Contraseña" required>
                    </div>

                    <div class="email">
                        <span class="emailLogo">
                            <i class="fa-regular fa-envelope fa-lg"></i>
                        </span>
                        <input type="email" name="email" id="email" placeholder="Correo Electronico" required>
                    </div>
                </div>
            </div>

            <div class="contentSendForm">
                <input type="submit" value="UNIRSE" class="buttonSingUp" name="buttonSingUp">

                <div class="contentSingUp">
                    <h4>
                        Si ya tienes una cuenta
                    </h4>
    
                    <h3 class="singIn">
                        Iniciar Sesion
                    </h3>
                </div>
            </div>
            </form>


        </div>


    </div>
    

    <script src="script.js"></script>
    <script>
        function hiddenSpawnAlert() {
            var spawnAlert = document.querySelector('#spawnAlert');
            if (spawnAlert) {
                spawnAlert.style.display = "none";
            }
        }

        setTimeout(() => {
            hiddenSpawnAlert();
    }, 3000);
    </script>

</body>
</html>