<?php

include("conexion.php");
include("iniciar.php");


if(isset($_POST['btnCodeResetPassword'])){
    session_start();
    if(isset($_SESSION['id'])){
        $idCode = $_SESSION['id'];

        $flagResetPassword = false;
        $flagStateNotification = false;
        $message;

        $getCodeUser = "SELECT code FROM code WHERE id = '$idCode'";
        $resultGetCodeUser = mysqli_query($conex, $getCodeUser);

        if(mysqli_num_rows($resultGetCodeUser) > 0){
            $rowCode = mysqli_fetch_assoc($resultGetCodeUser);
            $code = $rowCode['code'];

            $inputCode = $_POST['codeResetPassword'];

            if($inputCode == $code){
                $flagResetPassword = true;
                $_SESSION['flagResetPassword'] = $flagResetPassword;
                $flagStateNotification = false;
                $message = "";
                $_SESSION['flagStateNotification'] = $flagStateNotification;
                $_SESSION['message'] = $message;
                echo 
                "
                <script>
                    window.location.href = '../public/page/home/index.php';
                </script>
                ";
            }else{
                $flagResetPassword = false;
                $_SESSION['flagResetPassword'] = $flagResetPassword;
                $flagStateNotification = true;
                $message = "Codigo Incorrecto";
                $_SESSION['flagStateNotification'] = $flagStateNotification;
                $_SESSION['message'] = $message;
                echo 
                "
                <script>
                    window.location.href = '../public/page/home/index.php';
                </script>
                ";
            }
        }else{
            echo "Error ";
        }
    }else{
        echo "Error ";
    }

}

if(isset($_POST['btnResetPassword'])){
    session_start();
    if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];

        $password_1 = $_POST['codeResetPassword1'];
        $password_2 = $_POST['codeResetPassword2'];

        if($password_1 === $password_2){

            $password = md5($password_1);

            $getPasswordActuality = "SELECT contraseña FROM registros WHERE id = '$id'";
            $resultGetPasswordActuality = mysqli_query($conex, $getPasswordActuality);

            if(mysqli_num_rows($resultGetPasswordActuality) > 0){
                $row = mysqli_fetch_assoc($resultGetPasswordActuality);
                $oldPass = $row['contraseña'];
                if ($oldPass != $password){

                    $changePassword = "UPDATE registros SET contraseña = '$password' WHERE id = '$id'";
                    $resultChangePassword = mysqli_query($conex, $changePassword);
        
                    if($resultChangePassword){
                        $flagResetPassword = false;
                        $_SESSION['flagResetPassword'] = $flagResetPassword;
                        $flagStateNotification = false;
                        $message = "";
                        $_SESSION['flagStateNotification'] = $flagStateNotification;
                        $_SESSION['message'] = $message;
                        $deleteCode = "DELETE FROM code WHERE id = '$id'";
                        $resultDeleteCode = mysqli_query($conex, $deleteCode);
                        echo 
                        "
                        <script>
                            window.location.href = '../public/page/home/index.php';
                        </script>
                        ";
                    }else{
                        echo "No se encontro el id";
                    }   
        

                }else{
                    $flagStateNotification = true;
                    $message = "La contraseña debe ser diferente a la anterior";
                    $_SESSION['flagStateNotification'] = $flagStateNotification;
                    $_SESSION['message'] = $message;
                    echo 
                    "
                    <script>
                        window.location.href = '../public/page/home/index.php';
                    </script>
                    ";
                }
            }

        }else{
            $flagStateNotification = true;
            $message = "Las contraseñas deben ser iguales";
            $_SESSION['flagStateNotification'] = $flagStateNotification;
            $_SESSION['message'] = $message;
            echo 
            "
            <script>
                window.location.href = '../public/page/home/index.php';
            </script>
            ";
        }

    }

}

?>