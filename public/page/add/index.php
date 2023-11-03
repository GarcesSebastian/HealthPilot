<?php

session_start();
include("../../../database/iniciar.php");

$username;
$nombre_completo;
$fecha_nacimiento;
$genero;
$telefono;
$email;
$fecha_diagnostico;
$alergias;
$actividad_fisica;
$consumo_alcohol_tabaco;
$habitos_alimenticios;
$nivel_estres;
$info_extra;

if(isset($_SESSION['id'])){
  $id = $_SESSION['id'];

  $getStateUser = "SELECT estado FROM estados WHERE id = '$id'";
  $resultGetStateUser = mysqli_query($conex, $getStateUser);

  if(mysqli_num_rows($resultGetStateUser) > 0){
      $row = mysqli_fetch_assoc($resultGetStateUser);
      $state = $row['estado'];

      if($state == false){
          header("Location: ../../../index.php");
      }
  }
  
  $getDataUser = "SELECT * FROM registros WHERE id = '$id'";
  $resultGetDataUser = mysqli_query($conex, $getDataUser);

  if(mysqli_num_rows($resultGetDataUser) > 0){
      $row = mysqli_fetch_assoc($resultGetDataUser);
      $username = $row['usuario'];
  }

  $getDataInfoMedica = "SELECT * FROM informacion_medica WHERE id = '$id'";
  $resultGetDataInfoMedica = mysqli_query($conex, $getDataInfoMedica);

  if(mysqli_num_rows($resultGetDataInfoMedica) > 0){
    $row = mysqli_fetch_assoc($resultGetDataInfoMedica);
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
  }

}else{
  header("Location: ../../../index.php");
}


?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="../../styles/pagination.css" />
    <link
      rel="stylesheet"
      href="../project Pagina/font/fontawesome-free-6.4.0-web/css/fontawesome.min.css"
    />
    <script
      src="https://kit.fontawesome.com/7a00fb587a.js"
      crossorigin="anonymous"
    ></script>
    <script src="../../../node_modules/push.js/bin/push.js"></script>
    <title>Inicio-Menu</title>
  </head>
  <body>
    <div class="containerAll">
      <div class="contentView">
        
        <!--Spawn Configuracion-->

        <div class="spawnConfiguracion">

            <div class="contentNavConfiguracion">

                <span class="backContent">
                    <i class="fa-solid fa-arrow-left fa-lg"></i>
                </span>

                <h4 class="textBackContent">
                    Configuracion
                </h4>

            </div>

            <div class="contentConfiguracion">

                <div class="configNotificacion">
                    <h5 class="nameList">
                        Notificaciones
                    </h5>
                    <ul class="listConfig">
                        <li class="itemConfig">
                            <h5 class="textConfig">
                                Configurar notificaciones Push
                            </h5>
                        </li>
                    </ul>
                </div>

                <div class="configGeneral">
                    <h5 class="nameList">
                        General
                    </h5>
                    <ul class="listConfig">
                        <li class="itemConfig" data-general="1">
                            <h5 class="textConfig" style="display: flex; flex-direction:column; justify-content:center; gap:10px;">
                                Tema
                                <input type="color" id="colorPicker" class="color-input" value="#3d50e0" style="display: none;">
                            </h5>
                        </li>

                        <li class="itemConfig" data-general="2">
                            <h5 class="textConfig">
                                Idioma(not working)
                            </h5>
                        </li>

                        <li class="itemConfig" data-general="3">
                            <h5 class="textConfig">
                                Cuenta
                            </h5>
                        </li>

                    </ul>
                </div>

                <div class="configDatosMedicos">
                    <h5 class="nameList">
                        Datos Medicos
                    </h5>
                    <ul class="listConfig">
                        <li class="itemConfig" data-dataMedical="1">
                            <h5 class="textConfig">
                                Almacenar informacion medica
                            </h5>
                        </li>

                        <li class="itemConfig" data-dataMedical="2">
                            <h5 class="textConfig">
                                Consultar informacion medica
                            </h5>
                        </li>
                    </ul>
                </div>

                <div class="configOthers">
                    <h5 class="nameList">
                        Otras Opciones
                    </h5>
                    <ul class="listConfig">
                        <li class="itemConfig">
                            <h5 class="textConfig">
                                Versión de la aplicación(not working)
                            </h5>
                        </li>

                        <li class="itemConfig">
                            <h5 class="textConfig">
                                Politica de Privacidad(not working)
                            </h5>
                        </li>

                        <li class="itemConfig">
                            <h5 class="textConfig">
                                Terminos y Condiciones(not working)
                            </h5>
                        </li>

                        <li class="itemConfig">
                            <h5 class="textConfig">
                                Soporte Tecnico(not working)
                            </h5>
                        </li>

                        <li class="itemConfig" style="padding: 0;">
                            <form action="../../../database/logOut.php" method="post">
                              <input type="submit" class="textConfig btnSubmit" value="Cerrar sesion" name="buttonLogOut">
                                
                            </form>
                        </li>
                    </ul>
                </div>

            </div>

        </div>

        <!--Spawn Configuracion-->

        <!--Spawn Configuracion-->

        <div class="spawn">
          <div class="contentNavConfig">
            <span class="backContent">
              <i class="fa-solid fa-arrow-left fa-lg"></i>
            </span>

            <h4 class="textBackContent">Notificaciones push</h4>
          </div>

          <div class="contentConfig">

            <div class="configGeneralNotification">
              <h5 class="nameList">General</h5>
              <ul class="listConfig">
                <li class="itemConfig">
                  <h5 class="textConfig">Recibir notificaciones</h5>
                  <h5 class="stateToggleNotificaciones">Activado</h5>
                </li>
              </ul>
            </div>

            <div class="optionsNotifications">
              <h5 class="nameList">Opciones notificaciones push</h5>
              <ul class="listNotif">

                <li class="itemNotif" data-notification="1">
                  <h5 class="textNotif">Recordatorios</h5>
                  <label class="switch">
                    <input type="checkbox" class="checkNotification reminderNotification" checked>
                    <span class="slider round"></span>
                  </label>
                </li>

                <li class="itemNotif" data-notification="2">
                  <h5 class="textNotif">Activar sonido</h5>
                  <label class="switch">
                    <input type="checkbox" class="checkNotification soundNotification" checked>
                    <span class="slider round"></span>
                  </label>
                </li>

                <li class="itemNotif" data-notification="3">
                  <h5 class="textNotif">Spam</h5>
                  <label class="switch">
                    <input type="checkbox" class="checkNotification spamNotification" checked>
                    <span class="slider round"></span>
                  </label>
                </li>
              </ul>
            </div>

            <div class="configSoundNotifications">
              <h5 class="nameList">Sonidos</h5>
              <ul class="listConfig">

                <li class="itemConfig" data-sound="1">
                  <div class="contentSound">
                    <label for="playSound">
                      Sonido 1
                    </label>
                    <span class="iconPlaySound">
                      <i class="fa-regular fa-circle-play fa-lg"></i>
                    </span>
                  </div>

                  <div class="contentCheck">
                    <input type="checkbox" name="checkSound" class="checkSound" data-check="1" checked>
                  </div>
                </li>

                <li class="itemConfig" data-sound="2">
                  <div class="contentSound">
                    <label for="playSound">
                      Sonido 2
                    </label>
                    <span class="iconPlaySound">
                      <i class="fa-regular fa-circle-play fa-lg"></i>
                    </span>
                  </div>

                  <div class="contentCheck">
                    <input type="checkbox" name="checkSound" class="checkSound" data-check="2">
                  </div>
                </li>

                <li class="itemConfig" data-sound="3">
                  <div class="contentSound">
                    <label for="playSound">
                      Sonido 3
                    </label>
                    <span class="iconPlaySound">
                      <i class="fa-regular fa-circle-play fa-lg"></i>
                    </span>
                  </div>

                  <div class="contentCheck">
                    <input type="checkbox" name="checkSound" class="checkSound" data-check="3">
                  </div>
                </li>

                <li class="itemConfig" data-sound="4">
                  <div class="contentSound">
                    <label for="playSound">
                      Sonido 4
                    </label>
                    <span class="iconPlaySound">
                      <i class="fa-regular fa-circle-play fa-lg"></i>
                    </span>
                  </div>

                  <div class="contentCheck">
                    <input type="checkbox" name="checkSound" class="checkSound" data-check="4">
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>

        <!--Spawn Configuracion-->

        <!--Spawn Notificaciones-->

        <div class="spawnNotificaciones">
          <div class="contentNavNotificaciones">
            <span class="backContentNotificaciones">
              <i class="fa-solid fa-arrow-left fa-lg"></i>
            </span>

            <h4 class="textBackContentNotificaciones">Notificaciones</h4>
          </div>

          <div class="contentNotificaciones">
            <div class="trayContent">
              <ul class="listTray">
                <li class="itemTray">
                  <h5 class="textItem">Todos</h5>
                </li>

                <li class="itemTray">
                  <h5 class="textItem">Sin leer</h5>
                </li>

                <li class="itemTray liActive">
                  <h5 class="textItem">Ordenar por</h5>
                  <span class="arrow">
                    <i class="fa-solid fa-chevron-down fa-lg"></i>
                  </span>
                </li>
              </ul>
            </div>

            <div class="notifications">
              <ul class="listNotifications">
                <!-- <li class="itemNotifications">
                  <div class="infoNotifications">
                    <h4 class="titleNotification">Actividad</h4>
                    <p class="descriptionNotification">
                      Tienes un recordatorio de
                      <strong class="addNotification">Dosis prueba</strong>
                      pendiente, por favor confirme si ya lo recibio.
                    </p>

                    <h5 class="fechaNotification">Hace 20 minutos</h5>
                  </div>

                  <span class="moreNotification">
                    <i class="fa-solid fa-check fa-lg"></i>
                  </span>
                </li> -->
              </ul>
            </div>
          </div>
        </div>

        <!--Spawn Notificaciones-->


        <!--Spawn Popup New Reminder-->

        <div class="contentBlockPage">

            <div class="spawnPopupNewReminder">

              <span class="closeReminder">
                <i class="fa-solid fa-rectangle-xmark fa-lg"></i>
              </span>

                <div class="contentInputName">
                    <label for="inputName">Nombre del recordatorio:</label>
                    <input type="text" name="inputName" class="inputName clear" required>
                </div>

                <div class="contentInputDescription">
                    <label for="inputDescription">Nombre de la medicina:</label>
                    <input type="text" name="inputDescription" class="inputDescription clear" required>
                </div>

                <div class="contentInputTimeInit">
                  <label for="inputTimeInit">Fecha de inicio:</label>
                  <input type="date" name="inputTimeInit" class="inputTimeInit clear" required>
                </div>

                <div class="contentInputTimeEnd">
                  <label for="inputTimeEnd">Fecha de finalizacion:</label>
                  <input type="date" name="inputTimeEnd" class="inputTimeEnd clear" required>
                </div>

                <!-- <div class="contentInputSound">
                  <label for="inputSound">Sonido de alarma:</label>
                  <input type="file" accept=".mp3" name="inputSound" class="inputSound">
                </div> -->


                <div class="contentInputFrequency">
                  <div class="contentNumber">
                    <label for="inputNumberFrequency">Numero de veces:</label>
                    <input type="number" name="inputNumberFrequency" class="inputNumberFrequency clear" required>  
                  </div>

                  <div class="contentTimeDate">
                    <ul class="listTimeDate">
                      <!-- <li class="itemTimeDate">
                        <label for="inputTimeDate">Hora del recordatorio </strong class="numberTimeDate">1</strong></label>
                        <input type="time" name="inputTimeDate" class="inputTimeDate" required>
                      </li> -->
                    </ul>
                  </div>
                </div>

                <div class="contentConfirm">
                  <input type="submit" class="inputConfirm">
                </div>

            </div>


        </div>

        <!--Spawn Popup New Reminder-->

        <!--Spawn Popup Edit Reminder-->

        <div class="contentBlockPageEdit">

          <div class="spawnEditReminder">

            <div class="titleEditReminder">
              <h3>Editar Recordatorio</h3>
            </div>

            <span class="closeEditReminder">
              <i class="fa-solid fa-rectangle-xmark fa-lg"></i>
            </span>

            <div class="contentInputName">
              <label for="inputNameEdit">Nombre del recordatorio:</label>
              <input type="text" name="inputNameEdit" class="inputNameEdit clear" required>
            </div>

            <div class="contentInputDescription">
              <label for="inputDescriptionEdit">Nombre de la medicina:</label>
              <input type="text" name="inputDescriptionEdit" class="inputDescriptionEdit clear" required>
          </div>

          <div class="contentInputTimeInit">
            <label for="inputTimeInitEdit">Fecha de inicio:</label>
            <input type="date" name="inputTimeInitEdit" class="inputTimeInitEdit clear" required>
          </div>

          <div class="contentInputTimeEnd">
            <label for="inputTimeEndEdit">Fecha de finalizacion:</label>
            <input type="date" name="inputTimeEndEdit" class="inputTimeEndEdit clear" required>
          </div>

          <div class="contentInputFrequency">
            <div class="contentNumber">
              <label for="inputNumberFrequencyEdit">Numero de veces:</label>
              <input type="number" name="inputNumberFrequencyEdit" class="inputNumberFrequencyEdit clear" required>  
            </div>

            <div class="contentTimeDate">
              <ul class="listTimeDateEdit">
              </ul>
            </div>
          </div>

          <div class="contentConfirm">
            <input type="submit" class="inputConfirmEdit">
          </div>

          </div>

        </div>

        <!--Spawn Popup Edit Reminder-->

        <!--Spawn Pause Notification-->

        <div class="spawnPauseNotification">
          <input type="submit" value="Detener" class="btnPauseNotification">
        </div>

        <!--Spawn Pause Notification-->

        <!--Spawn config cuenta-->

        <div class="spawnConfigCuenta">
          <div class="contentNavConfigCuenta">
            <span class="backContent backContentCuenta">
              <i class="fa-solid fa-arrow-left fa-lg"></i>
            </span>
            <h4 class="textBackContent textBackContentCuenta">Cuenta</h4>
          </div>

          <div class="contentConfigCuenta">

            <div class="configCuenta">
              <h5 class="nameList">Configuracion de cuenta</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <span class="iconConfigCuenta">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  <h5 class="textConfigCuenta">Contraseña y Seguridad</h5>
                </li>

                <li class="itemConfig">
                  <span class="iconConfigCuenta">
                    <i class="fa-regular fa-address-book fa-lg"></i>
                  </span>
                  <h5 class="textConfigCuenta">Datos personales</h5>
                </li>

                <li class="itemConfig">
                  <span class="iconConfigCuenta">
                    <i class="fa-solid fa-stethoscope fa-lg"></i>
                  </span>
                  <h5 class="textConfigCuenta">Datos medicos</h5>
                </li>

              </ul>
            </div>

          </div>
        </div>

        <!--Spawn config cuenta-->

        <!--Spawn almacenar info medica-->

        <div class="spawnAlmacenar">
          <div class="contentNavAlmacenar">
            <span class="backContent backContentAlmacenar">
              <i class="fa-solid fa-arrow-left fa-lg"></i>
            </span>
            <h4 class="textBackContent textBackContentAlmacenar">Almacenar informacion medica</h4>
          </div>

          <form action="../../../database/sendInfoMedica.php" method="post" class="contentAlmacenar">

            <div class="Almacenar">
              <h5 class="nameList">Informacion Personal</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <input type="text" name="nameComplete" class="nameComplete" placeholder="Nombre Completo" value="<?php if(!empty($nombre_completo)){echo $nombre_completo;}else{echo "";} ?>">
                </li>

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  <label for="fechaNacimiento">Fecha de nacimiento:</label>
                  <input type="date" name="fechaNacimiento" class="fechaNacimiento" value="<?php if(!empty($fecha_nacimiento)){echo $fecha_nacimiento;}else{echo "";} ?>">
                </li>

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <select class="genero" name="genero">
                    <?php
                      if ($genero == "masculino") {
                        $options = <<<HTML
                          <option disabled>Selecciona un género</option>
                          <option value='masculino' selected>Masculino</option>
                          <option value='femenino'>Femenino</option>
                          <option value='otro'>Otro</option>
                  HTML;
                      } else if ($genero == "femenino") {
                        $options = <<<HTML
                          <option disabled>Selecciona un género</option>
                          <option value='masculino'>Masculino</option>
                          <option value='femenino' selected>Femenino</option>
                          <option value='otro'>Otro</option>
                  HTML;
                      } else if ($genero == "otro") {
                        $options = <<<HTML
                          <option disabled>Selecciona un género</option>
                          <option value='masculino'>Masculino</option>
                          <option value='femenino'>Femenino</option>
                          <option value='otro' selected>Otro</option>
                  HTML;
                      } else if (empty($genero)){
                        $options = <<<HTML
                          <option disabled selected>Selecciona un género</option>
                          <option value='masculino'>Masculino</option>
                          <option value='femenino'>Femenino</option>
                          <option value='otro'>Otro</option>
                  HTML;
                      }
                      echo $options;
                    ?>
                  </select>

                </li>

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <input type="number" name="telephone" class="telephone" placeholder="Numero de telefono" value="<?php if(!empty($telefono)){echo $telefono;}else{echo "";} ?>">
                </li>

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <input type="email" name="email" class="email" placeholder="Correo Electronico" value='<?php if(!empty($email)){echo $email;}else{echo "";} ?>'>
                </li>


              </ul>
            </div>

            <div class="Almacenar">
              <h5 class="nameList">Antecedentes Medicos</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  <label for="fechaDiagnostico">Fecha de diagnostico:</label>
                  <input type="date" name="fechaDiagnostico" class="fechaDiagnostico" value="<?php if(!empty($fecha_diagnostico)){echo $fecha_diagnostico;}else{echo "";} ?>">
                </li>

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <input type="text" name="alergias" class="alergias" placeholder="Alergias a medicamentos o alimentos" value="<?php if(!empty($alergias)){echo $alergias;}else{echo "";} ?>">
                </li>

              </ul>
            </div>

            <div class="Almacenar medicineActuality">
              <h5 class="nameList">Medicamentos Actuales</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <input type="number" name="listMedicine" class="listMedicine" placeholder="Numero de medicamentos recetados">
                </li>

              </ul>
            </div>

            <div class="Almacenar">
              <h5 class="nameList">Habitos de estilo de vida</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                  
                  <select class="activity" name="activity">
                  <?php
                      if ($actividad_fisica == "sedentario") {
                        $options = <<<HTML
                    <option value="" disabled>Nivel de actividad física</option>
                    <option value="sedentario" selected>Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado">Moderado (ejercicio regular)</option>
                    <option value="intenso">Intenso (actividad física intensa)</option>
                    <option value="muy-intenso">Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      } else if ($actividad_fisica == "ligero") {
                        $options = <<<HTML
                    <option value="" disabled>Nivel de actividad física</option>
                    <option value="sedentario" selected>Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado">Moderado (ejercicio regular)</option>
                    <option value="intenso">Intenso (actividad física intensa)</option>
                    <option value="muy-intenso">Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      } else if ($actividad_fisica == "moderado") {
                        $options = <<<HTML
                    <option value="" disabled>Nivel de actividad física</option>
                    <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado" selected>Moderado (ejercicio regular)</option>
                    <option value="intenso">Intenso (actividad física intensa)</option>
                    <option value="muy-intenso">Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      } else if ($actividad_fisica == "intenso") {
                        $options = <<<HTML
                    <option value="" disabled>Nivel de actividad física</option>
                    <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado">Moderado (ejercicio regular)</option>
                    <option value="intenso" selected>Intenso (actividad física intensa)</option>
                    <option value="muy-intenso">Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      } else if ($actividad_fisica == "muy-intenso") {
                        $options = <<<HTML
                    <option value="" disabled>Nivel de actividad física</option>
                    <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado">Moderado (ejercicio regular)</option>
                    <option value="intenso">Intenso (actividad física intensa)</option>
                    <option value="muy-intenso" selected>Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      } else if (empty($actividad_fisica)){
                        $options = <<<HTML
                    <option value="" disabled selected>Nivel de actividad física</option>
                    <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
                    <option value="ligero">Ligero (actividad física ligera)</option>
                    <option value="moderado">Moderado (ejercicio regular)</option>
                    <option value="intenso">Intenso (actividad física intensa)</option>
                    <option value="muy-intenso">Muy Intenso (entrenamiento riguroso)</option>
                  HTML;
                      }
                      echo $options;
                    ?>
                  </select>
                  
                  </li>

                  <li class="itemConfig">
                    <span class="iconAlmacenar">
                      <i class="fa-solid fa-shield-halved fa-lg"></i>
                    </span>
                    
                    <select class="alcohol-tobacco" name="alcohol-tobacco">
                    <?php
                      if ($consumo_alcohol_tabaco == "no-consumo") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo" selected>No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-alcohol") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol" selected>Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-tabaco") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco" selected>Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-alcohol-tabaco") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco" selected>Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-alcohol-regular") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular" selected>Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-tabaco-regular") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular" selected>Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if ($consumo_alcohol_tabaco == "consumo-alcohol-tabaco-regular") {
                        $options = <<<HTML
                      <option value="" disabled>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular" selected>Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      } else if (empty($consumo_alcohol_tabaco)){
                        $options = <<<HTML
                      <option value="" disabled selected>Selecciona tu consumo de alcohol y tabaco</option>
                      <option value="no-consumo">No consumo alcohol ni tabaco</option>
                      <option value="consumo-alcohol">Consumo alcohol ocasionalmente</option>
                      <option value="consumo-tabaco">Consumo tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-tabaco">Consumo alcohol y tabaco ocasionalmente</option>
                      <option value="consumo-alcohol-regular">Consumo alcohol regularmente</option>
                      <option value="consumo-tabaco-regular">Consumo tabaco regularmente</option>
                      <option value="consumo-alcohol-tabaco-regular">Consumo alcohol y tabaco regularmente</option>
                  HTML;
                      }
                      echo $options;
                    ?>
                    </select>
                    </li>

                    <li class="itemConfig">
                      <span class="iconAlmacenar">
                        <i class="fa-solid fa-shield-halved fa-lg"></i>
                      </span>
                      
                      <select class="alimentacion" name="alimentacion">
                      <?php
                      if ($habitos_alimenticios == "saludable") {
                        $options = <<<HTML
                        <option value="" disabled>Selecciona tus hábitos alimenticios</option>
                        <option value="saludable" selected>Alimentación saludable</option>
                        <option value="balanceada">Alimentación balanceada</option>
                        <option value="poco-saludable">Alimentación poco saludable</option>
                  HTML;
                      } else if ($habitos_alimenticios == "balanceada") {
                        $options = <<<HTML
                        <option value="" disabled>Selecciona tus hábitos alimenticios</option>
                        <option value="saludable">Alimentación saludable</option>
                        <option value="balanceada" selected>Alimentación balanceada</option>
                        <option value="poco-saludable">Alimentación poco saludable</option>
                  HTML;
                      } else if ($habitos_alimenticios == "poco-saludable") {
                        $options = <<<HTML
                        <option value="" disabled>Selecciona tus hábitos alimenticios</option>
                        <option value="saludable">Alimentación saludable</option>
                        <option value="balanceada">Alimentación balanceada</option>
                        <option value="poco-saludable" selected>Alimentación poco saludable</option>
                  HTML;
                      } else if (empty($habitos_alimenticios)){
                        $options = <<<HTML
                        <option value="" disabled selected>Selecciona tus hábitos alimenticios</option>
                        <option value="saludable">Alimentación saludable</option>
                        <option value="balanceada">Alimentación balanceada</option>
                        <option value="poco-saludable">Alimentación poco saludable</option>
                  HTML;
                      }
                      echo $options;
                    ?>
                      </select>
                      </li>

                      <li class="itemConfig">
                        <span class="iconAlmacenar">
                          <i class="fa-solid fa-shield-halved fa-lg"></i>
                        </span>
                        
                        <select class="estres" name="estres">
                        <?php
                      if ($nivel_estres == "bajo") {
                        $options = <<<HTML
                          <option value="" disabled>Selecciona tu nivel de estrés</option>
                          <option value="bajo" selected>Nivel de estrés bajo</option>
                          <option value="moderado">Nivel de estrés moderado</option>
                          <option value="alto">Nivel de estrés alto</option>
                  HTML;
                      } else if ($nivel_estres == "moderado") {
                        $options = <<<HTML
                          <option value="" disabled>Selecciona tu nivel de estrés</option>
                          <option value="bajo">Nivel de estrés bajo</option>
                          <option value="moderado" selected>Nivel de estrés moderado</option>
                          <option value="alto">Nivel de estrés alto</option>
                  HTML;
                      } else if ($nivel_estres == "alto") {
                        $options = <<<HTML
                          <option value="" disabled >Selecciona tu nivel de estrés</option>
                          <option value="bajo">Nivel de estrés bajo</option>
                          <option value="moderado">Nivel de estrés moderado</option>
                          <option value="alto" selected>Nivel de estrés alto</option>
                  HTML;
                      } else if (empty($nivel_estres)){
                        $options = <<<HTML
                          <option value="" disabled selected>Selecciona tu nivel de estrés</option>
                          <option value="bajo">Nivel de estrés bajo</option>
                          <option value="moderado">Nivel de estrés moderado</option>
                          <option value="alto">Nivel de estrés alto</option>
                  HTML;
                      }
                      echo $options;
                    ?>
                        </select>
                        
                        </li>

              </ul>
            </div>

            
            <div class="Almacenar">
              <h5 class="nameList">Notas Personales</h5>
              <ul class="listConfig">

                <li class="itemConfig">
                  <span class="iconAlmacenar">
                    <i class="fa-solid fa-shield-halved fa-lg"></i>
                  </span>
                
                  <textarea id="notas-personales" name="notas-personales" rows="4" cols="50" placeholder="Información adicional: " style="color:black;">
                  <?php
                      if(!empty($info_extra)){
                        echo $info_extra;
                      }else{
                        echo "";
                      }
                    ?>
                  </textarea>
                  
                </li>

              </ul>
            </div>

            <div class="Almacenar medicineActuality">
              <ul class="listConfig">
                <li class="itemConfig" style="padding: 0;">
                  <input type="submit" name="buttonSendInfoMedica" class="buttonSendInfoMedica btnSubmit">
                </li>
              </ul>
            </div>

          </form>

        </div>

        <!--Spawn almacenar info medica-->

        <!--Spawn consultar info medica-->

        <div class="spawnConsultar">
          <div class="contentNavConsultar">
            <span class="backContent backContentConsultar">
              <i class="fa-solid fa-arrow-left fa-lg"></i>
            </span>
            <h4 class="textBackContent textBackContentConsultar">Consultar informacion medica</h4>
          </div>

          <div class="contentConsultar">

            <div class="Consultar">
              <h5 class="nameList">Generar datos medicos</h5>
              <ul class="listConfig">

                <li class="itemConfig" style="padding: 0;">
                  <form action="../../../database/generarPdf.php" method="post" class="formSubmit">
                    <input type="submit" value="Generar por pdf" name="btnGenerarPDF" class="btnSubmit">
                  </form>
                </li>


              </ul>
            </div>

          </div>
        </div>

        <!--Spawn consultar info medica-->

        <div class="contentNav">
          <div class="navTop">
            <span class="configSpan">
              <i class="fa-solid fa-gear fa-lg"></i>
            </span>

            <span class="notificationSpan">
              <i class="fa-solid fa-bell fa-lg"></i>
              <span class="numberNotification">
                <i class="fa-solid fa-circle fa-sm"></i>
              </span>
            </span>
          </div>

          <div class="profile">
            <div class="imageProfile">
              <img
                src="../../../img/logo_small_icon_only_inverted.png"
                class="imgProfile"
              />
            </div>

            <div class="contentProfile">
              <h4 class="welcome">Welcome</h4>

              <h3 class="nameProfile"><?php echo $username ?></h3>
            </div>
          </div>
        </div>

        <div class="contentPage">
          <div class="contentAddReminder">
            <span>
              <i class="fa-solid fa-plus fa-lg"></i>
            </span>

            <h4 class="textAddReminder">Agregar Recordatorio</h4>
          </div>

          <div class="contentReminder">
            <ul class="listReminder">

              <li class="itemReminderNone">
                No hay recordatorios para mostrar
              </li> 

              <!-- <li class="itemReminder">
                <div class="contentTopReminder">

                  <span class="editReminder">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </span>

                  <h3 class="titleReminder">Ibuprofeno</h3>

                  <span class="showReminder">
                    <i class="fa-solid fa-eye fa-lg"></i>
                  </span>
                  
                  <span class="clearReminder">
                    <i class="fa-solid fa-trash fa-lg"></i>
                  </span>
                </div>

                <div class="description">
                  <p class="pNameMedicine">
                      Medicina: <strong class="nameMedicine">(nombre)</strong>
                  </p>
                
                  <p class="pTimeInit">
                    Fecha de inicio: <strong class="timeInit">(Fecha de inicio)</strong>
                  </p>

                  <p class="pTimeEnd">
                    Fecha de finalizacion: <strong class="timeEnd">(Fecha de finalizacion)</strong>
                  </p>

                  <p class="pNumberFrequency">
                    Frecuencia del recordatorio: <strong class="numberFrequency">(Frecuencia)</strong>
                  </p>

                  <p class="pTimeDate">
                    Hora del recordatorio: <strong class="timeDate">(Hora)</strong>
                  </p>
                </div>

              </li> -->
            </ul>
          </div>
        </div>

        <div class="contentFooter">
          <span class="home buttonFooter" data-id="1">
            <i class="fa-solid fa-house fa-lg"></i>
          </span>

          <span class="add buttonFooter" data-id="2">
            <i class="fa-solid fa-plus fa-lg"></i>
          </span>

        </div>


      </div>


      <audio class="audioPlayer" style="display: none;"></audio>
    </div>

    <script type="module" src="script.js"></script>
    </body>
</html>
