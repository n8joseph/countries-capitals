viewsModule.config(function($routeProvider) {
	$routeProvider.when("/countries/:country", {
		templateUrl : "./components/country/country.html",
		controller : 'CountryCtrl',
		resolve : {
			countryDetails : [
				'ccFindCountry',
				'$route',
				function(ccFindCountry, $route) {
					return ccFindCountry($route.current.params.country);
				}
			]
		}

	});
});

viewsModule.controller('CountryCtrl', function($scope, countryDetails, $route, ccRequest) {
	var allCountries = countryDetails.geonames;
	function getByValue(arr, value) {
		for (var i=0, iLen=arr.length; i<iLen; i++) {
    		if (arr[i].countryCode == value) return arr[i];
  		}
	};
  	var currentCountryCode = $route.current.params.country;
  	var currentCountry = getByValue(allCountries, currentCountryCode);
  	$scope.country = currentCountry;

  	var currentCountryCapital = currentCountry.capital;
  	/*
  	var capitalDetails = ccRequest('search?country=' + currentCountryCode + '&name_equals=' + currentCountryCapital);
  	$scope.capitalDetails = capitalDetails;
	

	var capitalDetails;
	
  	ccRequest('search?country=' + currentCountryCode + '&name_equals=' + currentCountryCapital).success(function(response) {
  		capitalDetails = response.data;
  	})
  	*/
  	$scope.tester = function() {
  		console.log(capitalDetails);

  	}
})
