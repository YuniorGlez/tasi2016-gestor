<?php

// respuesta json
$json = array();
if (isset($_GET["regId"])) {
    $gcm_regid = $_GET["regId"];
    include_once 'funciones.php';
    $db = new DB_Functions();
    $res = $db->storeUser($gcm_regid);
} else {
    // user details missing
}
?>
