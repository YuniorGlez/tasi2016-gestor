angular.module('TasiApp', ['ngRoute', 'ngSanitize'])
	.config(function ($routeProvider) {

		$routeProvider.
		when('/', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		}).
		when('/board', {
			templateUrl: 'partials/board.html',
			controller: 'BoardCtrl'
		}).
		when('/new', {
			templateUrl: 'partials/newEntry.html',
			controller: 'NewCtrl'
		})
	})
	.controller('LoginCtrl', function ($scope, $http, $rootScope) {
		$scope.loginData = {};
		$scope.login = function () {
			$http.post('/login',$scope.loginData).then(
				function (success) {
					if (success.data == 'Usuario validado') {
						localStorage.setItem('user', JSON.stringify(success.data));
						window.location.href = "#/board";
					}
					else
						alert('Usuario incorrecto');
				},
				function (err) {
					if (err) console.log('err');
					if (err) console.log(err);
				});
		}

	})
	.controller('NewCtrl', function ($scope, $http, $rootScope) {
		if (!localStorage.getItem('user')) window.location.href = "/";
		$scope.user = JSON.parse(localStorage.getItem('user'));
		$scope.newEntry = {};
		$scope.newEntry.title = "";
		$scope.newEntry.description = "";
		$scope.toHTML = function (text) {
			return text.replace(/\n/g, "<br/>");
		}
		$scope.enviar = function () {
			if ($scope.newEntry.img.value != "") {
				var pregunta = prompt("¿Estas seguro de que está todo correcto? Si/No \n");
				if (pregunta == "Sí" || pregunta == "Si" || pregunta == "sí" || pregunta == "si" || pregunta == "SI" || pregunta == "SÍ") {
					$http.post('/notice', $scope.newEntry).then(
						function (success) {
							if (success.status == 200) {
								alert('Noticia subida correctamente');
								window.location.href = "#/board";
							}
						},
						function (err) {
							alert(err);
							window.location.href = "#/board";
						});
				} else {
					alert("Su noticia no se ha enviado, revisela y vuelva a enviarla");
				}
			} else {
				alert("Es necesario adjuntar una imagen");
			}

		}

		$scope.cancelar = function () {
			var cancelado = prompt("¿Estas seguro de que quieres cancelar y volver al tablón principal? Si/No \n");
			if (cancelado == "Sí" || cancelado == "Si" || cancelado == "sí" || cancelado == "si") {
				window.location.href = '#/board';

			} else {
				return;
			}
		};
	})
	.controller('BoardCtrl', function ($scope, $http, $sce, $rootScope) {
		if (!localStorage.getItem('user')) window.location.href = "/";
		$scope.user = JSON.parse(localStorage.getItem('user'));
		$scope.logout = function(){localStorage.removeItem('user'); $http.get('/logout').then( function (success){ window.location.href ="/";}, function (err) {console.log(err)});}

		$scope.noticias = [];
		$scope.seleccionada = -1;
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
		$http.get('/notices').then(
			function (success) {
				$scope.noticias = success.data.reverse();
				for (var i = 0; i < $scope.noticias.length; i++) {
					$scope.noticias[i].cuerpo = $sce.trustAsHtml($scope.noticias[i].cuerpo);
				}
			},
			function (err) {
				console.log(err);
			})
		$scope.cambia = function (index) {
			$scope.seleccionada = index;
		};

		$scope.toHTML = function (text) {
			return $sce.getTrusted(text);
		};
		$scope.delete = function (index) {
			var pregunta = prompt("Estas seguro que quieres borrar la noticia " + $scope.noticias[index].titulo);
			console.log($scope.noticias[index]);
			if (pregunta == "Sí" || pregunta == "Si" || pregunta == "sí" || pregunta == "si" || pregunta == "SI" || pregunta == "SÍ") {
				$http.delete("/notice/" + $scope.noticias[index]._id).then(
					function (success) {
						alert("Borrada correctamente");
						window.location.assign(window.location.href)
					},
					function (err) {
						console.log(err);
					});
			}
		}
	})
//
//
//(function () {
//	'use strict';
//
//	angular.module('app', ['app.controllers'])
//		.config(
//			function ($locationProvider) {
//				$locationProvider.html5Mode(true);
//			}
//		);
//
//	angular.module('app.controllers', []);
//
//
//	var getLength = function (obj) {
//		var i = 0,
//			key;
//		for (key in obj) {
//			if (obj.hasOwnProperty(key)) {
//				i++;
//			}
//		}
//		return i;
//	};
//
//	var module = angular.module('app.controllers');
//	module.controller('FormController', FormController);
//
//	function FormController($scope) {
//		$scope.title = "";
//		$scope.description = "";
//		$scope.toHTML = function (text) {
//			return text.replace(/\n/g, "<br/>");
//		}
//		$scope.enviar = function () {
////			if (document.getElementById('Test').checked) {
////				alert("Has marcado la opcion prueba asi que ejecutare submitTest.php");
////				$('#formTest').append('<input type="hidden" name="title" value="prueba" />');
////				$('#formTest').append('<input type="hidden" name="description" value="Esto es una prueba" />');
////      			$('#formTest').submit();
////			}
////			else {
//				if ($scope.title.length > 5) {
//					if ($scope.description.length > 40) {
//						if (document.getElementById('img-file').value != "") {
//							var pregunta = prompt("¿Estas seguro de que está todo correcto? Si/No \n");
//							if (pregunta == "Sí" || pregunta == "Si" || pregunta == "sí" || pregunta == "si" || pregunta == "SI" || pregunta == "SÍ") {
//								$('form').submit();
//							} else {
//								alert("Su noticia no se ha enviado, revisela y vuelva a enviarla");
//							}
//						} else {
//							alert("Es necesario adjuntar una imagen");
//						}
//
//					} else {
//						alert("Introduce un texto mayor de 40 caracteres antes de enviar la noticia");
//					}
//				} else {
//					alert("Debes introducir un titulo mayor de 5 caracteres");
//				}
//			//}  //TO TEST
//
//		};
//
//		$scope.cancelar = function () {
//			var cancelado = prompt("¿Estas seguro de que quieres cancelar y volver al tablón principal? Si/No \n");
//			if (cancelado == "Sí" || cancelado == "Si" || cancelado == "sí" || cancelado == "si") {
//				window.location.href = './board.php';
//
//			} else {
//				return;
//			}
//		}
//	}
//})();
