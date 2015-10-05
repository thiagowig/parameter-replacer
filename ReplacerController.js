var replacerModule = angular.module('ReplacerModule', []);

replacerModule.controller('ReplacerController', function($scope){

	/* 
		Substitui os parâmetros.
	*/
	$scope.replaceParameters = function() {

		var parameters = $scope.parameters.split('\n');

		$scope.result = $scope.query;		

		$.each(parameters, function() {
			var parameterKeyValue = this.split('=');

			var keyPosition = 0;
			var valuePosition = 1;

			var keyName = parameterKeyValue[keyPosition];
			var convertedValue = convertValue(parameterKeyValue[valuePosition]);

			var keyRegex = new RegExp(keyName + "\\b", "g");

			$scope.result = $scope.result.replace(keyRegex, convertedValue);
		});

	};

});

/*
	Converte o valor logado para um valor reconhecido pelo Oracle.
*/
function convertValue(value) {

	if (!value) {
		return 'NULL';
	}

	value = value.trim();
	value = value.replace('[', '');
	value = value.replace(']', '');

	if (value.toUpperCase() == 'NULL') {
		return 'NULL';

	} else if (value.toUpperCase() == 'TRUE') {
		return 1;

	} else if (value.toUpperCase() == 'FALSE') {
		return 0;		

	} else if (isNaN(value)) {
		return "'" + value + "'";

	} else {
		return value;
	}

};