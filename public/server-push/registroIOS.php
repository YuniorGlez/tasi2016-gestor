<?php

// respuesta json
$json = array();
if (isset($_GET["token"])) {
    $token = $_GET["token"];
    include_once 'funciones.php';
    $db = new DB_Functions();
    $res = $db->storeUserIOS($token);
} else {
    // user details missing
}
?>
