(function () {
	'use strict';

	angular.module('app', ['app.controllers'])
		.config(
			function ($locationProvider) {
				$locationProvider.html5Mode(true);
			}
		);

	angular.module('app.controllers', []);


	var getLength = function (obj) {
		var i = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				i++;
			}
		}
		return i;
	};

	var module = angular.module('app.controllers');
	module.controller('FormController', FormController);

	function FormController($scope) {
		$scope.title = "";
		$scope.description = "";
		$scope.toHTML = function (text) {
			return text.replace(/\n/g, "<br/>");
		}
		$scope.enviar = function () {
//			if (document.getElementById('Test').checked) {
//				alert("Has marcado la opcion prueba asi que ejecutare submitTest.php");
//				$('#formTest').append('<input type="hidden" name="title" value="prueba" />');
//				$('#formTest').append('<input type="hidden" name="description" value="Esto es una prueba" />');
//      			$('#formTest').submit();
//			}
//			else {
				if ($scope.title.length > 5) {
					if ($scope.description.length > 40) {
						if (document.getElementById('img-file').value != "") {
							var pregunta = prompt("¿Estas seguro de que está todo correcto? Si/No \n");
							if (pregunta == "Sí" || pregunta == "Si" || pregunta == "sí" || pregunta == "si" || pregunta == "SI" || pregunta == "SÍ") {
								$('form').submit();
							} else {
								alert("Su noticia no se ha enviado, revisela y vuelva a enviarla");
							}
						} else {
							alert("Es necesario adjuntar una imagen");
						}

					} else {
						alert("Introduce un texto mayor de 40 caracteres antes de enviar la noticia");
					}
				} else {
					alert("Debes introducir un titulo mayor de 5 caracteres");
				}
			//}  //TO TEST

		};

		$scope.cancelar = function () {
			var cancelado = prompt("¿Estas seguro de que quieres cancelar y volver al tablón principal? Si/No \n");
			if (cancelado == "Sí" || cancelado == "Si" || cancelado == "sí" || cancelado == "si") {
				window.location.href = './board.php';

			} else {
				return;
			}
		}
	}
})();
