var replacerModule = angular.module('ReplacerModule', []);

replacerModule.controller('ReplacerController', function($scope){

	/*
		Substitui os parâmetros.
	*/
	$scope.replaceParameters = function() {

		var parameters = $scope.parameters.split('\n');

		$scope.result = $scope.query;

		$.each(parameters, function() {
			replaceParameter(this);
		})
	}

	/*
		Substitui cada parâmetro
	*/
	function replaceParameter(parameter) {
		var parameterKeyValue = parameter.split('=');

		var keyPosition = 0;
		var valuePosition = 1;

		var keyName = parameterKeyValue[keyPosition];
		var convertedValue = convertValue(parameterKeyValue[valuePosition]);

		var keyRegex = new RegExp(keyName + "\\b", "g");

		$scope.result = $scope.result.replace(keyRegex, convertedValue);
	}

	/*
		Converte o valor logado para um valor reconhecido pelo Oracle.
	*/
	function convertValue(value) {

		if (!value) {
			return 'NULL';
		}

		value = value.trim();

		if (contains(value, '[') || contains(value, ']')) {
			value = value.replace('[', '');
			value = value.replace(']', '');

			return value;

		}	else if (value.toUpperCase() == 'NULL') {
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
	}

	/*

	*/
	function contains(value, searchString) {
		return value.indexOf(searchString) > 0;
	}

});

/*
	Inicializa
 */
function initDialog() {
	var dialog = document.querySelector('dialog');
	var showModalButton = document.querySelector('.showResult');
	if (! dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showModalButton.addEventListener('click', function() {
		dialog.showModal();
	});
	dialog.querySelector('.closeButton').addEventListener('click', function() {
		dialog.close();
	});

	new Clipboard('.clipboardButton');
}

initDialog();
