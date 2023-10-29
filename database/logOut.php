<?php

include("../database/iniciar.php");


if(isset($_POST['buttonLogOut'])){

    session_start();
    $id = $_SESSION['id'];

    $getState = "SELECT estado FROM estados WHERE id = '$id'";
    $resultEstado = mysqli_query($conex, $getState);

    if(mysqli_num_rows($resultEstado) > 0){
        $row = mysqli_fetch_assoc($resultEstado);
        $state = $row['estado'];

        $stateNew = false;

        if($state == true){
            $sendState = "UPDATE estados SET estado = '$stateNew' WHERE id = '$id'";
            $resultSendEstado = mysqli_query($conex, $sendState);

            if($resultSendEstado){
                echo "Usted ha cerrado sesion";
                header("Location: ../index.php");
            }else{
                echo "Ocurrio un error al cerrar sesion";
            }
        }
    }else{
        echo "El id no existe.";
    }
}

?>