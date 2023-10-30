<?php
require("conexion.php");

if (isset($_POST['buttonSingUp'])) {
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    $email = $_POST['email'];

    if (empty($username) || empty($password) || empty($email)) {
        echo "Por favor, complete todos los campos.";
    } else {
        if (strlen($username) <= 18) {
            $query = "SELECT * FROM registros WHERE usuario = '$username'";
            $result = mysqli_query($conex, $query);
            if (mysqli_num_rows($result) > 0) {
                echo "El nombre de usuario ya está en uso. Por favor, elige otro.";
            } else {

                $confirmEmail = "SELECT * FROM registros WHERE email = '$email'";
                $resultConfirmEmail = mysqli_query($conex, $confirmEmail);
                
                if(mysqli_num_rows($resultConfirmEmail)>0){
                    echo "Este correo electrónico ya se encuentra registrado. Inicia sesión o utiliza uno diferente.";
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
                        echo "Registrado exitosamente";
                        header("Location: ../login/index.php");
                    }else{
                        echo $sql;
                    }    
                }
            }
        } else {
            echo "El nombre de usuario debe tener 18 caracteres como máximo.";
        }
    }
}
?>
