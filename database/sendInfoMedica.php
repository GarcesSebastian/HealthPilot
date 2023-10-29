<?php

session_start();
include("conexion.php");
require("iniciar.php");

if(isset($_POST['buttonSendInfoMedica'])){

    if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];

        //Informacion Personal
        $nameComplete = $_POST['nameComplete'] or " ";
        $fecha_nacimiento = $_POST['fechaNacimiento'] or " ";
        $genero = $_POST['genero'] or " ";
        $telefono = $_POST['telephone'] or 0;
        $email = $_POST['email'] or " ";

        //Antecedentes Medicos
        $fecha_diagnostico = $_POST['fechaDiagnostico'];
        $alergias = $_POST['alergias'];

        //Habitos estilo de vida
        $actividad_fisica = $_POST['activity'];
        $consumo_alcohol_tabaco = $_POST['alcohol-tobacco'];
        $habitos_alimenticios = $_POST['alimentacion'];
        $nivel_estres = $_POST['estres'];

        //Info extra
        $info_extra = $_POST['notas-personales'];


        $sendInfoMedica = "UPDATE informacion_medica 
        SET nombre_completo = '$nameComplete', fecha_nacimiento = '$fecha_nacimiento', 
        genero = '$genero', telefono = '$telefono', email = '$email',
        fecha_diagnostico = '$fecha_diagnostico', alergias = '$alergias',
        actividad_fisica = '$actividad_fisica', consumo_alcohol_tabaco = '$consumo_alcohol_tabaco',
        habitos_alimenticios = '$habitos_alimenticios', nivel_estres = '$nivel_estres', extra = '$info_extra'
        WHERE id = '$id'
        ";
        $resultSendInfoMedica = mysqli_query($conex, $sendInfoMedica);
    
        if($resultSendInfoMedica){
            echo "Cambios echos correctamente";
            header("Location: ../public/page/home/index.php");
        }else{
            echo "Ocurrio un error al hacer los cambios";
        }


    }else{
        echo "No se encontro un id";
    }

}

?>