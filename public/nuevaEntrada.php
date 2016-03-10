<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Web Eii Informa</title>
	<meta name="description" content="">
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
	<!-- Place favicon.ico in the root directory -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="css/materialize.min.css">
	<link rel="stylesheet" href="css/animate.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/colors.css">

	<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
	<script src="js/angular.min.js"></script>
	<script src="js/app.js"></script>
	<script src="js/materialize.min.js"></script>
	<link rel="stylesheet" media="(max-width: 700px)" href="css/mobile.css" />
	<script>
		window.jQuery || document.write('<script src="lib/jquery/jquery-2.1.3.min.js"><\/script>')
	</script>
	<style>
		.animated.bounceIn {
			-webkit-animation-duration: 1.3s !important;
			-o-animation-duration: 1.3s !important;
			animation-duration: 1.3s !important;
		}
	</style>
</head>

<body ng-app="app" ng-controller="FormController" class="one-page">



	<?php session_start(); $user=isset($_SESSION[ 'user'])? $_SESSION['user'] : null ; if ($user=='' ){ header( 'location:index.html?error=2'); } ?>

		<div class="navbar row">
			<p class="col s11">Hello Fran !</p>
			<i class="material-icons col s1">exit_to_app</i>
		</div>
		<div class="row content">
			<div class="col s12 m3 l5 form-left content">
				<form enctype="multipart/form-data" autocomplete="on" method="POST" action="submit.php">
					<div class="flow-text input-field row col s12 m12 offset-l2 l7 card-panel z-depth-1 hoverable">
						<input id="last_name" type="text" class="validate" name="title" ng-model="title">
						<label for="last_name">Título</label>
					</div>
					<div class=" flow-text input-field row col s12 m12 offset-l1 l9 card-panel z-depth-1 hoverable ">
						<textarea name="description" ng-model="description"></textarea>
						<label for="last_name">Descripción</label>
					</div>
					<div class="file-field input-field row col s10 offset-s1 m12 offset-l2  z-depth-0 hoverable l7">
						<input class="file-path validate col s7 m5" type="text" />
						<div class="azul-escuela btn col s5 offset-m1 m6">
							<span>Fichero</span>
							<input type="file" id="img-file" value="Image" name="img" ng-model="img" accept="img/*">
						</div>
					</div>
					<div class="row">
						<div class="azul-escuela cancel btn waves-effect waves-light col s4 offset-s1" ng-click="cancelar()">Cancelar <i class="material-icons">cancel</i>
						</div>
						<div class="azul-escuela enviar btn waves-effect waves-light col s4 offset-s1" ng-click="enviar()">Enviar <i class="material-icons">send</i>
						</div>
					</div>
<!--  				TO TEST-->
<!--
					<div class="row">
						<p class="col offset-s3 s4">
							<input  type="checkbox" id="Test" />
							<label for="Test">Test</label>
						</p>
					</div>
-->

				</form>
<!--				TO TEST -->
<!--				<form action="submitTest.php" method="POST" id="formTest"></form>-->
			</div>

			<div class="col hide-on-small-only m9 l7 previous-view content no-padding">
				<div class="displayMobile row ">
					<div class="mobile col offset-m4 offset-l4 l6 animated bounceIn z-depth-1 hoverable">
						<div class="notice text-flow">
							<img ng-src="{{img}}" class="img azul-escuela" />
							<h2 class="tittle">{{title}}</h2>
							<p class="content">{{description}}</p>
						</div>

					</div>
				</div>
				<div class="displayIpad row">
					<div class="ipad row col m9 offset-l1 animated bounceIn z-depth-1 hoverable">
						<div class="notice text-flow">
							<img ng-src="{{img}}" class="img azul-escuela" />
							<h2 class="tittle">{{title}}</h2>
							<p class="content">{{description}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
</body>

</html>
