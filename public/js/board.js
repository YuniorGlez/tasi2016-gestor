var app = angular.module('app', ['ngSanitize'])
	.controller('board', ['$scope' ,'$sce', function ($scope, $sce) {
		$scope.noticias;
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
        
		$.ajax({
			url: "/notices",
			type: "GET",
			success: function (data) {
                alert(data);
                
//				$scope.noticias = data.slice().reverse();
//				for	(var i = 0 ; i < getLength($scope.noticias); i++){
//					$scope.noticias[i].cuerpo = $sce.trustAsHtml($scope.noticias[i].cuerpo);
//				}
//				$scope.$apply();
			}
		});
		$scope.cambia = function (index) {
			$scope.seleccionada = index;
		};

		$scope.toHTML = function (text) {
			return $sce.getTrusted(text);
		};
		$scope.delete = function (index){
			var pregunta = prompt("Estas seguro que quieres borrar la noticia " + $scope.noticias[index].titulo);
			if (pregunta == "Sí" || pregunta == "Si" || pregunta == "sí" || pregunta == "si" || pregunta == "SI" || pregunta == "SÍ"){
				$.post("delete.php", { indice : index}).done( function (data) {
						alert ("Borrada correctamente");
				});
				window.location.href = "board.php";
			}
		}
	}]);
