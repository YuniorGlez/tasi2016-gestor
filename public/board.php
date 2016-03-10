<!DOCTYPE html>
<html ng-app="app">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Web Eii Informa</title>
	<meta name="description" content="">
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="css/materialize.min.css">
	<link rel="stylesheet" href="css/animate.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/colors.css">
	<link rel="stylesheet" media="(max-width: 700px)" href="css/mobile.css" />

	<script src="js/jquery-2.1.3.min.js"></script>
	<script src="js/materialize.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-sanitize.min.js"></script>
	<script src="js/board.js"></script>

</head>

<body ng-controller="board" class="one-page">

	<?php
session_start();
$user = (isset($_SESSION[ 'user']))? $_SESSION['user'] : null ;
if ($user=='' ){
	header( 'location:index.html?error=2');
}
	?>

		<div class="row navbar">
			<p class="col s3 m3 l2 users"><?php
					require_once 'server-push/funciones.php';
    					$db = new DB_Functions();
						echo "Instalada en +" . $db->getNumberOfUsers() . " dispositivos";

				?>

			</p>
			<p class="col s3 m3 l3">Nueva entrada</p>
			<a href="nuevaEntrada.php"><i class=" plus-btn material-icons col s1 m1 l1">add_circle_outline</i></a>
			<p class="col s3 m4 offset-l3 l2">Bienvenido Fran !</p>
			<i class="material-icons col s1 m1 l1 plus-btn">exit_to_app</i>
		</div>
		<div class="row">
			<div class="leftDisplay col s12 m7 l5">
				<div ng-repeat="noticia in noticias" class="row noticia card-panel waves-effect waves-light animated bounceIn z-depth-3 " ng-click="cambia($index)">
					<img ng-src="{{noticia.img}}" class="photo col s3 m4 l5" alt="">
					<div class="col s9 m8 l7">
						<h5 class="title" ng-bind-html="noticia.titulo"></h5>
						<i class="material-icons col s1 m1 l1 del-btn" ng-click="delete($index)">delete</i>
						<div class="description" ng-bind-html="noticia.cuerpo"></div>
					</div>
				</div>

			</div>
			<div class="noticeDisplay col s9 m5 l7 animated zoomIn">
				<div class="row">
					<img ng-src="{{noticias[seleccionada].img}}" alt="" style="z-index:3!important" width="650" class="photo col s6 offset-s3 m6 offset-m3 l6 offset-l3 align-center materialboxed">
					<div class="col m3 l3"></div>
				</div>
				<h5 class="tittle s12" ng-bind-html="noticias[seleccionada].titulo"></h5>
				<i ng-if="seleccionada != -1" class="material-icons col s1 m1 l1 del-btn-der" style="color:black" ng-click="delete(seleccionada)">delete</i>
				<div class="cuerpo s12" ng-bind-html="noticias[seleccionada].cuerpo"></div>
				<p class="right publicado" ng-if="noticias[seleccionada].fecha">Fecha de publicación: {{noticias[seleccionada].fecha}}</p>

			</div>
		</div>
</body>

</html>
