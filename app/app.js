'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', [
	'ngRoute',
	'ui.bootstrap',
	'myApp.version',
	]).
controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $http) {
	/* Local Storage start */
	// Return data from LocalStorage
	if(localStorage.getItem('minP') !== undefined) {$scope.minP = parseInt(localStorage.getItem('minP'));}
	if(localStorage.getItem('maxP') !== undefined) {$scope.maxP = parseInt(localStorage.getItem('maxP'));}

	if(localStorage.getItem('minR') !== undefined) {$scope.minR = parseInt(localStorage.getItem('minR'));}
	if(localStorage.getItem('maxR') !== undefined) {$scope.maxR = parseInt(localStorage.getItem('maxR'));}

	if(localStorage.getItem('sortTable') !== undefined) {$scope.predicate = localStorage.getItem('sortTable');}

	// Append to LocalStorage
	$scope.addMinP = function() {
		$scope.minP != null ? localStorage['minP'] = $scope.minP : localStorage['minP'] = "";
	}
	$scope.addMaxP = function() {
		$scope.maxP != null ? localStorage['maxP'] = $scope.maxP : localStorage['maxP'] = "";
	}

	$scope.addMinR = function() {
		$scope.minR != null ? localStorage['minR'] = $scope.minR : localStorage['minR'] = "";
	}
	$scope.addMaxR = function() {
		$scope.maxR != null ? localStorage['maxR'] = $scope.maxR : localStorage['maxR'] = "";
	}
	/* Local Storage end */

	/* Sort functions start */
	$scope.sortTable = function(col) { $scope.predicate = col; localStorage['sortTable'] = col;}
	/* Sort functions end */

	// Get data from JSON
	$http.get("menu.json").then( function(responce){ $scope.items = responce.data; } );

	/* Filter functions start */
	$scope.priceFilter = function(item) {
		var itemFlag = true;
		if((item.price < $scope.minP) || (item.price > $scope.maxP && $scope.maxP != null)) {itemFlag = false;}
		return itemFlag;
	};
	$scope.ratingFilter = function(item) {
		var itemFlag2 = true;
		if((item.rating < $scope.minR) || (item.rating > $scope.maxR && $scope.maxR != null)) {itemFlag2 = false;}
		return itemFlag2;
	};

	$scope.clearFilters = function() {
		$scope.minR = null;
		$scope.maxR = null;

		$scope.minP = null;
		$scope.maxP = null;
	}
	/* Filter functions end */

	$scope.openPopUpDialog = function(item) {
		$scope.showPopUpDialog = true;
		$scope.item = item;
	}

	$scope.duplicateFilter = function(value, id, array) {
		function sortArr(arr, elem) {
			var count=0;
			var tempArr = [];
			for (var i = 0; i < arr.length; i++) {
				if(elem == arr[i]) {
					count++;
					tempArr[tempArr.length] = i;
				}
			}

			if(count > 1) {
				for(var i = 1; i < tempArr.length; i++) {
					array.splice(tempArr[i], 1);
					array[tempArr[0]] += ": " + count;
				}
			}
			return array;
		}
		return sortArr(array, value);
	}
};

app.directive("popUpDialog", function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'popUpDialog.html',
		controller: function($scope){
			$scope.showPopUpDialog = false;
			$scope.closePopUpDialog = function(){
				$scope.showPopUpDialog = false;
			}
		}
	}
});