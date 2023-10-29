<?php

include("conexion.php");
require_once("../public/others/TCPDF-main/tcpdf.php");

session_start();

if(isset($_POST['btnGenerarPDF'])){

    if(isset($_SESSION['id'])){

        $id = $_SESSION['id'];

        $getInfoMedica = "SELECT * FROM informacion_medica WHERE id = '$id'";
        $resultGetInfoMediac = mysqli_query($conex, $getInfoMedica);

        if(mysqli_num_rows($resultGetInfoMediac) > 0){
            $row = mysqli_fetch_assoc($resultGetInfoMediac);

            $nombre_completo = $row['nombre_completo'];
            $fecha_nacimiento = $row['fecha_nacimiento'];
            $genero = $row['genero'];
            $telefono = $row['telefono'];
            $telefono = intval($telefono);
            $email = $row['email'];
            $fecha_diagnostico = $row['fecha_diagnostico'];
            $alergias = $row['alergias'];
            $actividad_fisica = $row['actividad_fisica'];
            $consumo_alcohol_tabaco = $row['consumo_alcohol_tabaco'];
            $habitos_alimenticios = $row['habitos_alimenticios'];
            $nivel_estres = $row['nivel_estres'];
            $info_extra = $row['extra'];

            if($genero == "masculino"){
                $genero = "Masculino";
            }else if($genero == "femenino"){
                $genero = "Femenino";
            }else if($genero == "otro"){
                $genero = "Otro";
            }

            if($actividad_fisica == "sedentario"){
                $actividad_fisica = "Sedentario";
            }else if($actividad_fisica == "ligero"){
                $actividad_fisica = "Ligero";
            }else if($actividad_fisica == "moderado"){
                $actividad_fisica = "Moderado";
            }else if($actividad_fisica == "intenso"){
                $actividad_fisica = "Intenso";
            }else if($actividad_fisica == "muy-intenso"){
                $actividad_fisica = "Muy intenso";
            }

            if($consumo_alcohol_tabaco == "no-consumo"){
                $consumo_alcohol_tabaco = "No consumo";
            }else if($consumo_alcohol_tabaco == "consumo-alcohol"){
                $consumo_alcohol_tabaco = "Consumo alcohol";
            }else if($consumo_alcohol_tabaco == "consumo-tabaco"){
                $consumo_alcohol_tabaco = "Consumo tabaco";
            }else if($consumo_alcohol_tabaco == "consumo-alcohol-tabaco"){
                $consumo_alcohol_tabaco = "Consumo alcohol y tabaco";
            }else if($consumo_alcohol_tabaco == "consumo-alcohol-regular"){
                $consumo_alcohol_tabaco = "Consumo alcohol regularmente";
            }else if($consumo_alcohol_tabaco == "consumo-tabaco-regular"){
                $consumo_alcohol_tabaco = "Consumo tabaco regularmente";
            }else if($consumo_alcohol_tabaco == "consumo-alcohol-tabaco-regural"){
                $consumo_alcohol_tabaco = "consumo alcohol y tabaco regularmente";
            }

            if($habitos_alimenticios == "saludable"){
                $habitos_alimenticios = "Saludable";
            }else if($habitos_alimenticios == "balanceada"){
                $habitos_alimenticios = "Balanceada";
            }else if($habitos_alimenticios == "poco-saludable"){
                $habitos_alimenticios = "Poco saludable";
            }

            if($nivel_estres == "bajo"){
                $nivel_estres = "Bajo";
            }else if($nivel_estres == "moderado"){
                $nivel_estres = "Moderado";
            }else if($nivel_estres == "alto"){
                $nivel_estres = "Alto";
            }

            $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

            $pdf->SetCreator('TuNombre');
            $pdf->SetAuthor('Nombre del Autor');
            $pdf->SetTitle('Informe Médico');
            $pdf->SetSubject('Informe Médico');
            $pdf->SetKeywords('Informe Médico, TCPDF, PDF');

            $pdf->AddPage();

            $pdf->writeHTML(false, true, false, true, false, '');

            $html = <<<EOD
            <h1 style="font-size: 18px; text-align: center; background-color: #007BFF; color: #fff; padding: 5px; margin-bottom: 10px;">Informe Médico</h1>
            <div class="section" style="background-color: #F5F5F5; padding: 10px; margin-bottom: 10px;">
                <p><strong>Nombre Completo:</strong> $nombre_completo</p>
                <p><strong>Fecha de Nacimiento:</strong> $fecha_nacimiento</p>
                <p><strong>Género:</strong> $genero</p>
                <p><strong>Teléfono:</strong> $telefono</p>
                <p><strong>Email:</strong> $email</p>
            </div>
            
            <div class="section" style="background-color: #F5F5F5; padding: 10px; margin-bottom: 10px;">
                <p><strong>Información de Salud</strong></p>
                <p><strong>Fecha de Diagnóstico:</strong> $fecha_diagnostico</p>
                <p><strong>Alergias:</strong> $alergias</p>
                <p><strong>Actividad Física:</strong> $actividad_fisica</p>
                <p><strong>Consumo de Alcohol y Tabaco:</strong> $consumo_alcohol_tabaco</p>
                <p><strong>Hábitos Alimenticios:</strong> $habitos_alimenticios</p>
                <p><strong>Nivel de Estrés:</strong> $nivel_estres</p>
            </div>
            
            <div class="section" style="background-color: #F5F5F5; padding: 10px; margin-bottom: 10px;">
                <p><strong>Información Adicional</strong></p>
                <p>$info_extra</p>
            </div>
            EOD;
            
            $pdf->writeHTML($html, true, false, true, false, '');

            $pdf->Output('InformeMedico.pdf', 'I');

        }

    }

}

?>