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

if (isset($_POST['buttonLogIn'])) {
    $username = $_POST['username'];
    $password = md5($_POST['password']);

    if (empty($username) || empty($password)) {
        $message = "Ambos campos son obligatorios.";
        showSpawnAlert($message);
        $message = "";
    } else {
        $query = "SELECT * FROM registros WHERE usuario = '$username'";
        $result = mysqli_query($conex, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $storedHash = $row['contraseña'];
            $id = $row['id'];


            if ($password == $storedHash) {

                $state = true;
                $setState = "UPDATE estados SET estado = '$state' WHERE id = '$id'";
                $resultSetState = mysqli_query($conex, $setState);

                if ($resultSetState) {

                    session_start();
                    $_SESSION['id'] = $id;
                    $_SESSION['email'] = $email;
                    $_SESSION['username'] = $username;

                    header("Location: ../public/page/home/index.php");
                }else{
                    echo "Hubo un error al cambiar el id";
                }
            } else {
                $message = "Contraseña incorrecta.";
                showSpawnAlert($message);
                $message = "";
            }
        } else {
            $message = "El nombre de usuario no existe.";
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
    <title>Login</title>
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
                    <img src="../img/logo2.png" class="imageLogo">
                </span>

                <div class="contentForm">
                    <div class="username">
                        <span class="userLogo">
                            <i class="fa-regular fa-user fa-lg"></i>
                        </span>
                        <input type="text" name="username" id="username" placeholder="Username">
                    </div>

                    <div class="password">
                        <span class="keyLogo">
                            <i class="fa-solid fa-key fa-lg"></i>
                        </span>
                        <input type="password" name="password" id="password" placeholder="Password">
                    </div>
                </div>
            </div>

            <div class="contentSendForm">
                <input type="submit" value="LOG IN" class="buttonLogIn" name="buttonLogIn">

                <div class="contentSingUp">
                    <h4>
                        If you don't have an account
                    </h4>
    
                    <h3 class="singUp">
                        Sing Up
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