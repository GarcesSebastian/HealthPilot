<?php
require("conexion.php");

if (isset($_POST['buttonLogIn'])) {
    $username = $_POST['username'];
    $password = md5($_POST['password']);

    if (empty($username) || empty($password)) {
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
                }
            } else {
            }
        } else {
        }
        
    }
}
?>
