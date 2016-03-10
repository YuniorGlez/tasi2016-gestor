<?php

if (isset($_GET["message"])) {
	include_once 'funciones.php';
    $db = new DB_Functions();
    $message = $_GET["message"];

	// FOR ANDROID DEVICES
    $users = $db->getAllUsers();
    include_once 'GCM.php';
    $gcm = new GCM();
    $mensaje = array(
    'message' 		=> $message,
	'title'			=> 'Eii Informa',
	'msgcnt'		=> '1',
	'timeToLive' => 3000,
	);
	$gcm->send_notification($users, $mensaje);
	

	// FOR IOS DEVICES using parse.io 
    require 'autoload.php';
	use Parse\ParsePush;
	use Parse\ParseClient;
	ParseClient::initialize( '4a8b7TejBbrbYPsgwGGnJntiOhlvHvqhaYEIh5Uc', 'GoL0L8ih57jaftyKBVgATwru7p9NAAhMKYESaiSB', 'v8YzEzDXNPF75yoBB2Hyyj1jp0avtN0kq0kEbIjs' );
	$data = array("alert" => $mensaje);
	// Push to Channels
	ParsePush::send(array(
		"channels" => ["global"],
		"badge" => "Increment",
		"data" => $data
	));
	

}
?>