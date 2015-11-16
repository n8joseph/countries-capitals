angular.module('ccAppViews', ['ui.router', 'ccLibrary'])
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'components/home/home.html',
				controller: 'homeCtrl'
			})

			.state('countries', {
				url: '/countries',
				templateUrl: 'components/countries/countries.html',
				controller: 'countriesCtrl',
				resolve: {
					countries: ['getCountry', function(getCountry) {
						return getCountry();
					}]
				}
			})

			.state('country', {
				url: '/countries/:country/capital',
				templateUrl: 'components/country/country.html',
				controller: 'countryDetailCtrl',
				resolve: {
					geoname: ['$stateParams', 'getGeoname', function($stateParams, getGeoname) {
						console.log('real getGeoname is called');
						return getGeoname($stateParams.country);
					}],
					country: ['getCountry', 'geoname', function(getCountry, geoname) {
						console.log('real getCountry is called');
						return getCountry(geoname.countryCode);
					}],
					capital: ['getCapital', 'country', function(getCapital, country) {
						console.log('real getCapital is called');
						return getCapital(country.geonames[0].capital, country.geonames[0].countryCode);
					}],
					neighbors: ['$stateParams', 'getNeighbors', function($stateParams, getNeighbors) {
						console.log('real getNeighbors is called');
						return getNeighbors($stateParams.country);
					}]
				}
			});
	}])

	.controller('homeCtrl', ["$scope", function($scope) {

	}])

	.controller('countriesCtrl', ["$scope", "$location", "countries", function($scope, $location, countries) {
		$scope.countries = countries.geonames;
		$scope.goToCountry = function(country) {
			var x = '/countries/' + country + '/capital';
			$location.path(x);
		};
	}])

	.controller('countryDetailCtrl', ["$scope", "geoname", "country", "capital", "neighbors", function($scope, geoname, country, capital, neighbors) {
		$scope.geoname = geoname;
		var noNeighbors = {countryName: 'None'};
		if (neighbors.geonames.length < 1) {
			$scope.neighbors = [];
			$scope.neighbors[0] = noNeighbors;
		}
		else {$scope.neighbors = neighbors.geonames.slice(0, 3);};
		$scope.country = country.geonames[0];
		$scope.capital = capital.geonames[0];
	}]);