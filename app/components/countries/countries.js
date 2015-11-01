viewsModule.config(function($routeProvider) {
	$routeProvider.when("/countries", {
		templateUrl : "./components/countries/countries.html",
		controller : 'CountriesCtrl',
		resolve : {
			allCountries : [
				'ccCountryInfo',
				function(ccCountryInfo) {
					return ccCountryInfo();
				}
			]
		}
	});
});

viewsModule.controller('CountriesCtrl', ['$scope', 'allCountries', function($scope, allCountries) {	
	$scope.allCountries = allCountries.geonames
	$scope.tester = function() { console.log(allCountries.geonames) }
}])

	
