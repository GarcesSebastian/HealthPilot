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
                $id = rand(0,9999);
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
        } else {
            echo "El nombre de usuario debe tener 18 caracteres como máximo.";
        }
    }
}
?>
