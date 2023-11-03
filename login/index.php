<?php
session_start();
include("../database/iniciar.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../database/phpmailer/src/Exception.php';
require '../database/phpmailer/src/PHPMailer.php';
require '../database/phpmailer/src/SMTP.php';

$message;

$flagEnterCode = false;
$flagResetPasswordL = false;

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


if(isset($_POST['btnConfirmEmail'])){
    $email = $_POST['inputEmail'];
    $_SESSION['emailSave'] = $email;

    $getDataUser = "SELECT * FROM registros WHERE email = '$email'";
    $resultGetDataUser = mysqli_query($conex, $getDataUser);

    if (mysqli_num_rows($resultGetDataUser) > 0) {
        $row = mysqli_fetch_assoc($resultGetDataUser);
        $id = $row['id'];

        $existCode = "SELECT code FROM code WHERE id = '$id'";
        $resultExistCode = mysqli_query($conex, $existCode);

        if(mysqli_num_rows($resultExistCode) <= 0){

            do {
                $codigo_verificacion = rand(100000, 999999);
                $verifyCodeL = "SELECT id FROM code WHERE code = '$codigo_verificacion'";
                $resultVerifyCodeL = mysqli_query($conex, $verifyCodeL);
            } while (mysqli_num_rows($resultVerifyCodeL) > 0);
    
            $sendCode = "INSERT INTO code (id, code) VALUES ('$id', '$codigo_verificacion')";
            $resultSendCode = mysqli_query($conex, $sendCode);
    
            if ($resultSendCode) {
                    $flagEnterCode = true;
    
                    $emailAdd = $email;
                    $nameComplete = $row['usuario'];
                    $nombre = ucfirst($nameComplete);
    
                    $nombre = ucfirst($nameComplete);
                        
                    $email = new PHPMailer(true);
                    $email->isSMTP();
                    $email->Host = 'smtp.gmail.com';
                    $email->SMTPAuth = true;
                    $email->Username = 'sebastiangarces152@gmail.com';
                    $email->Password = 'ocxogzwntaaacecg';
                    $email->SMTPSecure = 'tls';
                    $email->Port = 587;
                    $email->setFrom('sebastiangarces152@gmail.com');
                    $email->addAddress($emailAdd);
                    $email->isHTML(true);
                    $email->Subject = "CODE VERIFICATION";
                    $email->Body = "
                    <div class='containerAll'>
                        <h4 style='font-size: 20px; font-weight:bolder; color:tomato;'>¡Hola! $nombre, tu código de verificación:</h4>
                        <h3 style='color:white; background:tomato; border-radius:5px; width:fit-content; padding:.5% 1.5%;' class='text'>$codigo_verificacion</h3>    
                    </div>
                    ";
                    $email->send();
                
                
            } else {
                echo "Hubo un error " . $resultSendCode;
            }

        }

        $flagEnterCode = true;


    }
}


if(isset($_POST['btnConfirmCode'])){

        if(isset($_SESSION['emailSave'])){
            $emailSave = $_SESSION['emailSave'];

            $getDataUser = "SELECT * FROM registros WHERE email = '$emailSave'";
            $resultGetDataUser = mysqli_query($conex, $getDataUser);

            if(mysqli_num_rows($resultGetDataUser) > 0){
                $row = mysqli_fetch_assoc($resultGetDataUser);
                $userID = $row['id'];

                $getCodeUser = "SELECT code FROM code WHERE id = '$userID'";
                $resultGetCodeUser = mysqli_query($conex, $getCodeUser);

                if(mysqli_num_rows($resultGetCodeUser) > 0){
                    $rowCode = mysqli_fetch_assoc($resultGetCodeUser);
                    $code = $rowCode['code'];

                    $inputCode = $_POST['inputCode'];

                    if($inputCode == $code){
                        $flagEnterCode = false;
                        $flagResetPasswordL = true;

                        $deleteCode = "DELETE FROM code WHERE id = '$userID'";
                        $resultDeleteCode = mysqli_query($conex, $deleteCode);

                        if(!$resultDeleteCode){
                            echo "Ocurrio un error al eliminar el codigo";
                        }

                    }else{

                        echo 
                        "
                            <script>
                                alert('Codigo Incorrecto');
                            </script>
                        ";
                        $flagEnterCode = true;
                        $flagResetPasswordL = false;

                    }
                }else{
                    echo "Error ";
                }

            }
        }


}

if(isset($_POST['btnConfirmResetPassword'])){

    $emailSave = $_SESSION['emailSave'];

    $getDataUser = "SELECT * FROM registros WHERE email = '$emailSave'";
    $resultGetDataUser = mysqli_query($conex, $getDataUser);

    if(mysqli_num_rows($resultGetDataUser) > 0){
        $row = mysqli_fetch_assoc($resultGetDataUser);
        $userID = $row['id'];

        $password_1 = $_POST['codeResetPassword1'];
        $password_2 = $_POST['codeResetPassword2'];
    
        if($password_1 === $password_2){
    
            $password = md5($password_1);
    
            $getPasswordActuality = "SELECT contraseña FROM registros WHERE id = '$userID'";
            $resultGetPasswordActuality = mysqli_query($conex, $getPasswordActuality);
    
            if(mysqli_num_rows($resultGetPasswordActuality) > 0){
                $row = mysqli_fetch_assoc($resultGetPasswordActuality);
                $oldPass = $row['contraseña'];
                if ($oldPass != $password){
    
                    $changePassword = "UPDATE registros SET contraseña = '$password' WHERE id = '$userID'";
                    $resultChangePassword = mysqli_query($conex, $changePassword);
        
                    if($resultChangePassword){
                        $deleteCode = "DELETE FROM code WHERE id = '$userID'";
                        $resultDeleteCode = mysqli_query($conex, $deleteCode);
                        $flagResetPasswordL = false;
                        echo 
                        "
                        <script>
                            alert('Contraseña cambiada con exito');
                        </script>
                        ";
                    }else{
                        echo "No se encontro el id";
                    }   
        
    
                }else{
                    $flagResetPasswordL = true;
                    echo 
                    "
                    <script>
                        alert('La contraseña debe ser diferente a la anterior');
                    </script>
                    ";
                }
            }
    
        }else{
            $flagResetPasswordL = true;
            echo 
            "
            <script>
                alert('Las contraseñas deben ser iguales');
            </script>
            ";
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
    <link rel="stylesheet" href="../public/styles/pagination.css">
    <link rel="stylesheet" href="../project Pagina/font/fontawesome-free-6.4.0-web/css/fontawesome.min.css">
    <script src="https://kit.fontawesome.com/7a00fb587a.js" crossorigin="anonymous"></script>
    <title>Login</title>
</head>
<body>

    <div class="containerAll">

        <div class="contentView">

            <div class="contentBlockForgotPassword">

                <form action="./index.php" method="post" class="spawnForgotPassword" data-form="1">
                    <div class="contentNavForgotPassword">
                        <span class="closeForgotPassword">
                            <i class="fa-solid fa-xmark fa-lg"></i>
                        </span>
                    </div>
                    <div class="contentInput">
                        <h4 class="textInputEmail">
                        Si ha olvidado su contraseña, ingrese su dirección de correo electrónico en el campo a continuación. Le enviaremos un correo electrónico con un codigo para restablecer su contraseña.
                        </h4>
                        <input type="email" name="inputEmail" class="inputEmail" placeholder="Correo Electronico" required>
                    </div>

                    <div class="confirmEmail">
                        <input type="submit" value="Enviar" name="btnConfirmEmail">
                    </div>
                    
                </form>

                <?php
                    if($flagEnterCode){
                        
                        $changeHTML = <<<HTML

                        <form action="./index.php" method="post" class="spawnForgotPassword" data-form="2" style="display:flex;">
                            
                            <div class="contentInput">
                                <h4 class="textInputEmail">
                                    Le hemos enviado un código de verificación a su dirección de correo electrónico. Revise su bandeja de entrada e ingrese el código de verificación a continuación para continuar.
                                </h4>
                                <input type="number" name="inputCode" class="inputCode" placeholder="Ingrese el codigo" required>
                            </div>
    
                            <div class="confirmEmail">
                                <input type="submit" value="Enviar" name="btnConfirmCode">
                            </div>
                            
                        </form>
    
                        <script>
                            
                            let codeResetPassword = document.querySelector(".inputCode");

                            codeResetPassword.addEventListener("input", () => {
                            let valueCode = codeResetPassword.value;
                            let lenCode = valueCode.length;
                            if (lenCode > 6) {
                                codeResetPassword.value = valueCode.slice(0, 6);
                            }
                            });

                            let formForgotPassword = document.querySelectorAll(".spawnForgotPassword");
    
                            document.querySelector(".contentBlockForgotPassword").style.display = "flex";
    
                            formForgotPassword.forEach(element =>{
    
                                if(element.getAttribute("data-form") === "2"){
                                    element.style.display = "flex";
                                }
    
                            });
    
                        </script>
                        
                    HTML;

                        echo $changeHTML;
    
                    }

                    if($flagResetPasswordL){
                        
                        $changeHTML = <<<HTML

                        <form action="./index.php" method="post" class="spawnForgotPassword" data-form="3" style="display:flex;">
                            
                            <div class="contentInput">
                                <h4>
                                    Escriba su nueva contraseña, recuerde que no puede ser igual a la anterior.
                                </h4>
                                <input type="password" class="codeResetPassword" name="codeResetPassword1" placeholder="Nueva contraseña">
                                <input type="password" class="codeResetPassword" name="codeResetPassword2" placeholder="Nueva contraseña">
                            </div>
    
                            <div class="confirmEmail">
                                <input type="submit" value="Enviar" name="btnConfirmResetPassword">
                            </div>
                            
                        </form>
    
                        <script>

                            let formForgotPassword = document.querySelectorAll(".spawnForgotPassword");
    
                            document.querySelector(".contentBlockForgotPassword").style.display = "flex";
    
                            formForgotPassword.forEach(element =>{
    
                                if(element.getAttribute("data-form") === "2"){
                                    element.style.display = "flex";
                                }
    
                            });
    
                        </script>
                        
                        HTML;

                        echo $changeHTML;

                    }
                ?>

            </div>

            <form action="./index.php" method="post" class="form">

            <div class="contentLogin">
                <span class="logoPage">
                    <img src="../img/logo.png" class="imageLogo">
                </span>

                <div class="contentForm">
                    <div class="username">
                        <span class="userLogo">
                            <i class="fa-regular fa-user fa-lg"></i>
                        </span>
                        <input type="text" name="username" id="username" placeholder="Usuario">
                    </div>

                    <div class="password">
                        <span class="keyLogo">
                            <i class="fa-solid fa-key fa-lg"></i>
                        </span>
                        <input type="password" name="password" id="password" placeholder="Contraseña">
                    </div>
                </div>
            </div>

            <div class="contentSendForm">
                <input type="submit" value="INICIAR" class="buttonLogIn" name="buttonLogIn">

                <div class="contentSingUp">
                    <h4 class="forgotPassword">
                        ¿Has olvidado tu contraseña?
                    </h4>
    
                    <h3 class="singUp">
                        Registrate Aqui
                    </h3>
                </div>
            </div>
            </form>


        </div>


    </div>
    

    <script src="script.js"></script>
    <script>

    let forgotPassword = document.querySelector(".forgotPassword");

    let formForgotPassword = document.querySelectorAll(".spawnForgotPassword");

    forgotPassword.addEventListener("click", () =>{
        document.querySelector(".contentBlockForgotPassword").style.display = "flex";

        formForgotPassword.forEach(element =>{

            if(element.getAttribute("data-form") === "1"){
                element.style.display = "flex";
            }

        });

    });

    let closeForgotPassword = document.querySelector(".closeForgotPassword");

    closeForgotPassword.addEventListener("click", () =>{
        document.querySelector(".contentBlockForgotPassword").style.display = "none";
        document.querySelector(".spawnForgotPassword").style.display = "none";
    });
    </script>
</body>
</html>