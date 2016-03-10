<?php
function comprobacion ($user , $pass ){
 	return ($user == "fran" && $pass == "pass");
}
if (isset( $_POST['user']) &&  isset($_POST['pass'])   ){
	if (comprobacion($_POST['user'] , $_POST['pass']) ) {
		session_start(); // root reconocido correctamente
		$_SESSION['user'] = "root";
		header('location:./board.php');
	}else{
		echo "<script type=\"text/javascript\">
		alert(\"Has introducido un usuario y contraseña incorrectos\");
		setTimeout( function () {
			window.location.href='./index.html';
		} , 10 );
		</script>";
	}
}
else{
	// Avisamos al usuario de que no intr
	echo "<script type=\"text/javascript\">
		alert(\"No has introducido usuario y contraseña\");
		setTimeout( function () {
		 	window.location.href='./index.html';
		} , 10  );
			</script>";

}

?>
