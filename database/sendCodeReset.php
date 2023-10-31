<?php
include("conexion.php");
include("iniciar.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

session_start();

if(isset($_POST['btnConfirmResetCode'])){
    
    if(isset($_SESSION['id'])){

        $id = $_SESSION['id'];
        $getDataUser = "SELECT * FROM registros WHERE id = '$id'";
        $resultGetData = mysqli_query($conex, $getDataUser);

        $codigo_verificacion;

        do{
            $codigo_verificacion = rand(100000,999999);
            $verifyCode = "SELECT id FROM code WHERE code = '$codigo_verificacion'";
            $resultVerifyCode = mysqli_query($conex, $verifyCode);
        }while(mysqli_num_rows($resultVerifyCode) > 0);

        if(mysqli_num_rows($resultGetData) > 0){

            $row = mysqli_fetch_assoc($resultGetData);
            
            $emailAdd = $row['email'];
            $nameComplete = $row['usuario'];

            $nombre = ucfirst($nameComplete);
        
            $email = new PHPMailer(true);
            $email->isSMTP();
            $email->Host = 'smtp.gmail.com';
            $email->SMTPAuth = true;
            $email->Username = 'sebastiangarces152@gmail.com';
            $email->Password = 'uoremustxitqtwsv';
            $email->SMTPSecure = 'ssl';
            $email->Port = 465;
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

            $sendCode = "INSERT INTO code (id,code) VALUES ('$id','$codigo_verificacion')";
            $resultSendCode = mysqli_query($conex, $sendCode);

            if(!$resultSendCode){
                echo "Hubo un error " . $resultSendCode;
            }

            header("Location: ../public/page/home/index.php");

        }

    }

}

?>


