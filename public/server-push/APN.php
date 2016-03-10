<?php

class APN{
	function __construct() {

    }

	
	public function send_notification( $tokens, $mensaje){	
				// Returns TRUE if there was and FALSE if there was not
		function checkAppleErrorResponse($fp) {
		//byte1=always 8, byte2=StatusCode, bytes3,4,5,6=identifier(rowID). 
		// Should return nothing if OK.
		
		//NOTE: Make sure you set stream_set_blocking($fp, 0) or else fread will pause your script and wait 
		// forever when there is no response to be sent. 
		
		$apple_error_response = fread($fp, 6);
		
			
			// unpack the error response (first byte 'command" should always be 8)
			$error_response = unpack('Ccommand/Cstatus_code/Nidentifier', $apple_error_response); 
			
			if ($error_response['status_code'] == '0') {
				$error_response['status_code'] = '0-No errors encountered';
				
			} else if ($error_response['status_code'] == '1') {
				$error_response['status_code'] = '1-Processing error';
				
			} else if ($error_response['status_code'] == '2') {
				$error_response['status_code'] = '2-Missing device token';
				
			} else if ($error_response['status_code'] == '3') {
				$error_response['status_code'] = '3-Missing topic';
				
			} else if ($error_response['status_code'] == '4') {
				$error_response['status_code'] = '4-Missing payload';
				
			} else if ($error_response['status_code'] == '5') {
				$error_response['status_code'] = '5-Invalid token size';
				
			} else if ($error_response['status_code'] == '6') {
				$error_response['status_code'] = '6-Invalid topic size';
				
			} else if ($error_response['status_code'] == '7') {
				$error_response['status_code'] = '7-Invalid payload size';
				
			} else if ($error_response['status_code'] == '8') {
				$error_response['status_code'] = '8-Invalid token';
				
			} else if ($error_response['status_code'] == '255') {
				$error_response['status_code'] = '255-None (unknown)';
				
			} else {
				$error_response['status_code'] = $error_response['status_code'].'-Not listed';
				
			}
			
			
			echo 'ERROR Response Status:' . $error_response['status_code'] . PHP_EOL . PHP_EOL;
			
		
		
		}

		
		// El password del fichero .pem
		$passphrase = 'eiiinformapush';
		// El mensaje push
		$message = substr($mensaje, 0 ,5);
		$ctx = stream_context_create();
		//Especificamos la ruta al certificado .pem que hemos creado TODO
		stream_context_set_option($ctx, 'ssl', 'local_cert', 'certs/EiiInformaPushCK.pem');
		stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
		// Abrimos conexión con APNS
		echo "iosdebug";
		$fp = stream_socket_client(
			'ssl://gateway.push.apple.com:2195', $err,
			$errstr, 60, STREAM_CLIENT_CONNECT, $ctx);
		
		stream_set_blocking ($fp, 0); 
		
		if (!$fp) {
			exit("Error de conexión: $err $errstr" . PHP_EOL);
		}
		// Creamos el payload
		$body['aps'] = array(
			'alert' => $message
			);
		
		// Lo codificamos a json
		$payload = json_encode($body);
		$howmany = 0;
		$pruebas = 'c621c5db4fb305f71197d8fb8718be2483f9cbc1a063c29fc62ac88ab9fd3997';
//		foreach ($tokens as $token){
//			$msg = pack("C", 1) . pack('H*', $pruebas) . pack("n", strlen($payload)) . $payload;
//        	$result = fwrite($fp, $msg, strlen($msg));
//			// We can check if an error has been returned while we are sending, but we also need to 
//			// check once more after we are done sending in case there was a delay with error response.
//			usleep(800000);
//			checkAppleErrorResponse($fp); 
//			
////			echo "\$payload = $payload " . PHP_EOL;
////			echo "\$result = $result " . PHP_EOL;
////			echo "strlen(\$payload) = ". strlen($payload) . PHP_EOL;
////			echo "\$err = $err " . PHP_EOL;
////			echo "\$ctx = $ctx " . PHP_EOL;
////			echo "\$fp = $fp " . PHP_EOL;
////			
//			
//			$howmany += 1;
//		}
		//echo "Mensaje enviado a $howmany usuarios de IOS";
			$msg = pack("C", 1) . pack('H*', $pruebas) . pack("n", strlen($payload)) . $payload;
        	$result = fwrite($fp, $msg, strlen($msg));
		
		usleep(2000000);
		checkAppleErrorResponse($fp);	
		fclose($fp);
		// FUNCTION to check if there is an error response from Apple

		/* El sacado de la guia 
		// Nuestro token
$deviceToken = 'c621c5db4fb305f71197d8fb8718be2483f9cbc1a063c29fc62ac88ab9fd3997';
 
// El password del fichero .pem
		$passphrase = 'eiiinformapush';
 
// El mensaje push
$message = '¡Mi primer mensaje Push!';
 
$ctx = stream_context_create();
//Especificamos la ruta al certificado .pem que hemos creado
		stream_context_set_option($ctx, 'ssl', 'local_cert', 'certs/EiiInformaPushCK.pem');
		stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
 
// Abrimos conexión con APNS
$fp = stream_socket_client(
	'ssl://gateway.sandbox.push.apple.com:2195', $err,
	$errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);
 
if (!$fp) {
	exit("Error de conexión: $err $errstr" . PHP_EOL);
}
 
 
// Creamos el payload
$body['aps'] = array(
	'alert' => $message,
	'sound' => 'bingbong.aiff',
	'badge' => 35
	);
 
// Lo codificamos a json
$payload = json_encode($body);
 
// Construimos el mensaje binario
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
 
// Lo enviamos
$result = fwrite($fp, $msg, strlen($msg));
 
		echo $result;
 
// cerramos la conexión
fclose($fp);

*/
		
		
	}
}
?>
