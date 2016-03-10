<?php
if (isset($_POST['indice'])){
	$eliminada = $_POST['indice'];
$myfile = fopen("notices.json", "r") or die("Unable to open file!");
$content = trim(fread($myfile,filesize("notices.json") ) ) or die ("No pude leerlo o hacerle trim)");
$closeStr = substr ($content, -5);
$prevData = substr($content, 0, strpos($content, '[') + 1);
$content = substr($content, 5 , -4);
$content2 = substr($content, strpos($content, '[') + 1);
$temp = $content2;
$a = 0;
while ( !(strpos($temp, '{') === false)) {

	if ($eliminada == 0 && $a == 1){
		$temp2 = substr($temp, strrpos($temp, '{'), -2)  . $temp2;
		echo "Noticia numero $a ";
		echo "<br>";
		echo substr($temp, strrpos($temp, '{'), -2);
		echo "sali por el eliminan a 0  ";
		echo "<br>";
		echo "<br>";

	}
	else if ($a != $eliminada && $a != 0){
		$temp2 = substr($temp, strrpos($temp, '{'), -1) . " " . $temp2;
		echo "Noticia numero $a ";
		echo "<br>";
		echo substr($temp, strrpos($temp, '{'), -1);
		echo "sali por el 1 ";
		echo "<br>";
		echo "<br>";
	}else if ($a != $eliminada && $a == 0){
		$temp2 = substr($temp, strrpos($temp, '{'))  . $temp2;
		echo "Noticia numero $a ";
		echo "<br>";
		echo substr($temp, strrpos($temp, '{'));
		echo "sali por el 2 ";
		echo "<br>";
		echo "<br>";

	}
	else if ( strpos(substr($temp, 0 ,  strrpos($temp, '{')), '{') === false ){
		echo "Noticia numero $a ";
		echo "<br>";
		echo substr($temp, strrpos($temp, '{'), -1);
		$temp2 = substr($temp, strrpos($temp, '{'), -2) . $temp2;
		echo "sali por el 3";
		echo "<br>";
		echo "<br>";

	}

	$a++;

	$temp = substr($temp, 0 ,  strrpos($temp, '{'));
}
fclose($myfile);

$outStr = $prevData . substr($temp2,0,-1) . $closeStr ;
//echo $outStr;
$outFile = fopen("notices.json", "w") or die("Unable to open file!");
fwrite($outFile, $outStr);
fclose($outFile);
}
?>


	</body>

	</html>
