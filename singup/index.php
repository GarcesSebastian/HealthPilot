<?php
session_start();
include("../database/iniciar.php");

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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="../public/styles/queries.css">
    <link rel="stylesheet" href="../project Pagina/font/fontawesome-free-6.4.0-web/css/fontawesome.min.css">
    <script src="https://kit.fontawesome.com/7a00fb587a.js" crossorigin="anonymous"></script>
    <title>SingUp</title>
</head>
<body>

    <div class="containerAll">

        <div class="contentView">

            <form action="../database/register.php" method="post">
            <div class="contentLogin">
                <span class="logoPage">
                    <img src="../img/logo2.png" class="imageLogo">
                </span>

                <div class="contentForm">
                    <div class="username">
                        <span class="userLogo">
                            <i class="fa-regular fa-user fa-lg"></i>
                        </span>
                        <input type="text" name="username" id="username" placeholder="Username" required>
                    </div>

                    <div class="password">
                        <span class="keyLogo">
                            <i class="fa-solid fa-key fa-lg"></i>
                        </span>
                        <input type="password" name="password" id="password" placeholder="Password" required>
                    </div>

                    <div class="email">
                        <span class="emailLogo">
                            <i class="fa-regular fa-envelope fa-lg"></i>
                        </span>
                        <input type="email" name="email" id="email" placeholder="Email" required>
                    </div>
                </div>
            </div>

            <div class="contentSendForm">
                <input type="submit" value="SING UP" class="buttonSingUp" name="buttonSingUp">

                <div class="contentSingUp">
                    <h4>
                        If you already have an account
                    </h4>
    
                    <h3 class="singIn">
                        Sing In
                    </h3>
                </div>
            </div>
            </form>


        </div>


    </div>
    

    <script src="script.js"></script>
</body>
</html>