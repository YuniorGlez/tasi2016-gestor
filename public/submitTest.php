<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="js/jquery-2.1.3.min.js"></script>
</head>
<body>

<?php
function clean($text){
	$output = str_replace("\r\n", "\n", $text);
    $output = str_replace("\r", "\n", $output);
    // JSON requires new line characters be escaped
    $output = str_replace("\n", "\\n", $output);
    $output = str_replace("\"", "\\\"", $output);
	return $output;
}
function conEnlaces($text){
	$format = "/(?:^|\s)(http\S+)/i";
	$output = preg_replace($format, "<a onclick=\\\"window.open('$0','_system')\\\">$0</a>" , $text);
	return $output;
}

//function contenido ($date) {
//	if (isset($_POST['title']) &&  isset($_POST['description']) && isset($_FILES['img'])){
//		$temp = "{ \n";
//		$img_path = $date;
//		$temp = $temp . "\"img\" : \"http://www.eii.ulpgc.es/app-eii-informa/uploads/" . $img_path . "\" , \n" ;
//		$temp = $temp . "\"titulo\" : \"" . clean($_POST['title']) . "\", \n";
//		$cuerpoCleaned = clean($_POST['description']); //TODO
//		$cuerpoConEnlaces = conEnlaces($cuerpoCleaned);
//		$temp = $temp . "\"cuerpo\" : \"" . $cuerpoConEnlaces . "\", \n";
//		$temp = $temp . "\"clase\" : \" none\" , \n";
//		$temp = $temp . "\"vista\" : false  ,\n";
//		$temp = $temp . "\"fecha\" : \"" . date("d-m-Y") . "\" \n";
//		return $temp;
//	}else{
//		echo "<script>
//			alert(\"No ha rellenado los campos o no ha adjuntado imagen para la noticia\")
//			</script>";
//		die();
//	}
//}

function contenido ($date) {
		$temp = "{ \n";
		$temp = $temp . "\"img\" : \"http://www.eii.ulpgc.es/app-eii-informa/uploads/acto_bienvenida.png" . "\" , \n" ;
		$temp = $temp . "\"titulo\" : \"" . clean($_POST['title']) . "\", \n";
		$cuerpoCleaned = clean($_POST['description']); //TODO
		$cuerpoConEnlaces = conEnlaces($cuerpoCleaned);
		$temp = $temp . "\"cuerpo\" : \"" . $cuerpoConEnlaces . "\", \n";
		$temp = $temp . "\"clase\" : \" none\" , \n";
		$temp = $temp . "\"vista\" : false  ,\n";
		$temp = $temp . "\"fecha\" : \"" . date("d-m-Y") . "\" \n";
		return $temp;
}
//
//if ( isset($_FILES['img']) === false ){
//	echo "<script type=\"text/javascript\">
//		alert(\"Se ha olvidado adjuntar una imagen\");
//		setTimeout( function () {
//		 window.location.href='./nuevaEntrada.html';
//		 						} , 10 );
//	</script>";
//	die();
//}
//
$date = date("m-d-Y H:i:s");
//$target_path = "uploads/";
//$target_path = $target_path . $date;
//if(move_uploaded_file($_FILES['img']['tmp_name'], $target_path)) {
////	echo "El archivo ". basename( $_FILES['img']['name']). " ha sido subido";
//
//}else{
//	echo "Ha ocurrido un error, trate de nuevo!";
//	print_r($_FILES);
//	die();
//}
//
echo "probando";
$myfile = fopen("noticesTest.json", "r") or die("Unable to open file!");
$content = trim(fread($myfile,filesize("noticesTest.json") ) ) or die ("No pude leerlo o hacerle trim)");
$closeStr = substr ($content, -5);
$prevData = substr($content, 0 , -5) . " }, ";
$outStr = $prevData . contenido($date) . $closeStr;
fclose($myfile);
$outFile = fopen("noticesTest.json", "w") or die("Unable to open file!");
fwrite($outFile, $outStr);
fclose($outFile);
?>

<script type="text/javascript">
	$.get( "server-push/enviar_mensajeTest.php",{ message : <?php echo("\"" . $_POST['title'] . "\"") ?> }).done(function(data){
//										     alert(data);
//											 var numberSuccess = data.substr(data.lastIndexOf("success")+7 , 5);
//											 numberSuccess = numberSuccess.replace(/[^0-9]+/g, '');
//											 alert("La noticia se ha enviado correctamente a " + numberSuccess + " usuarios de Android");
											 alert(data.substr((data.lastIndexOf("iosdebug")+8)));
//												 alert(data);
//	setTimeout( function () {
//			window.location.href='./board.php';
//	} , 200 );
											});

</script>
</body>
</html>
