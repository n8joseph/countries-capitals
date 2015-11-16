angular.module('ccLibrary', [])

	.constant('CC_API_PREFIX', 'http://api.geonames.org/')
	.constant('COUNTRY_PATH', 'countryInfoJSON')
	.constant('SEARCH_PATH', 'searchJSON')
	.constant('NEIGHBORS_PATH', 'neighboursJSON')
	.constant('GEONAME_PATH', 'getJSON')
	.constant('CC_API_USERNAME', 'n8joseph')

	.factory('getCountry', ['$http', '$q', 'CC_API_PREFIX', 'COUNTRY_PATH', 'CC_API_USERNAME', 
		function($http, $q, CC_API_PREFIX, COUNTRY_PATH, CC_API_USERNAME) {
			return function(countryCode) {
				var country = countryCode || null;
				var defer = $q.defer();
				$http({
					url: CC_API_PREFIX + COUNTRY_PATH,
					method: 'GET',
					cache: true,
					params: {
						country: country,
						username: CC_API_USERNAME
					}
				})
					.success(function(data) {
						console.log(data);
						defer.resolve(data);
					})
					.error(function(data) {
						console.log('getCountry went wrong');
					})
				return defer.promise;
			}
		}
	])

	.factory('getGeoname', ['$http', '$q', 'CC_API_PREFIX', 'GEONAME_PATH', 'CC_API_USERNAME', 
		function($http, $q, CC_API_PREFIX, GEONAME_PATH, CC_API_USERNAME) {
			return function(geonameId) {
				var defer = $q.defer();
				$http({
					url: CC_API_PREFIX + GEONAME_PATH,
					method: 'GET',
					cache: true,
					params: {
						geonameId: geonameId,
						username: CC_API_USERNAME
					}
				})
					.success(function(data) {
						console.log(data);
						defer.resolve(data);
					})
					.error(function(data) {
						console.log('getGeoname went wrong');
					})
				return defer.promise;
			}
		}
	])

	.factory('getNeighbors', ['$http', '$q', 'CC_API_PREFIX', 'NEIGHBORS_PATH', 'CC_API_USERNAME', 
		function($http, $q, CC_API_PREFIX, NEIGHBORS_PATH, CC_API_USERNAME) {
			return function(geonameId) {
				var defer = $q.defer();
				$http({
					url: CC_API_PREFIX + NEIGHBORS_PATH,
					method: 'GET',
					cache: true,
					params: {
						geonameId: geonameId,
						username: CC_API_USERNAME
					}
				})
					.success(function(data) {
						console.log(data);
						defer.resolve(data);
					})
					.error(function(data) {
						console.log('getNeighbors went wrong');
					})
				return defer.promise;
			}
		}
	])

	.factory('getCapital', ['$http', '$q', 'CC_API_PREFIX', 'SEARCH_PATH', 'CC_API_USERNAME', 
		function($http, $q, CC_API_PREFIX, SEARCH_PATH, CC_API_USERNAME) {
			return function(capitalName, countryCode) {
				var defer = $q.defer();
				$http({
					url: CC_API_PREFIX + SEARCH_PATH,
					method: 'GET',
					cache: true,
					params: {
						q: capitalName,
						name_equals: capitalName,
						country: countryCode,
						isNameRequired: true,
						featureCode: 'PPLC',
						username: CC_API_USERNAME
					}
				})
					.success(function(data) {
						console.log(data);
						defer.resolve(data);
					})
					.error(function(data) {
						console.log('getCapital went wrong');
					})
				return defer.promise;
			}
		}
	])

/*

	.constant('CC_API_PREFIX', 'http://api.geonames.org/')
	.constant('CC_COUNTRY_PATH', '&country={{ id }}')
	.constant('CC_CAPITAL_PATH', '&name_equals={{ id }}')
	

	.factory('ccRequest', function($http, $q, CC_API_PREFIX) {

		return function(path) {
			var defer = $q.defer();
			$http.defaults.cache = true;
			$http.get(CC_API_PREFIX + path, { params: { 
												username : "n8joseph",
												type: 'json'
			 }})
				.success(function(data) {
					defer.resolve(data);
				})
			return defer.promise;
		}
	})

	.factory('ccCountryInfo', function($http, $q, ccRequest) {
		return function() {
			return ccRequest('countryInfo?');
		}
	})

	.factory('ccSearch', function($http, $q, ccRequest) {
		return function() {
			return ccRequest('search?')
		}
	})

	.factory('ccFindCountry', function(
		ccCountryInfo, $interpolate, CC_COUNTRY_PATH) {
		return function(q) {
			var path;
			path = $interpolate(CC_COUNTRY_PATH)({
					id : q
				});
			return ccCountryInfo(path);
		}
	})
*/
/*
	.factory('ccFindCapital', function(
		ccCountryInfo, ccSearch, $interpolate, CC_COUNTRY_PATH, $q) {
		return function(q, $q, ccCountryInfo) {
			var path;
			path = $interpolate(CC_COUNTRY_PATH)({
					id : q
				});
			var countryResult;
			

			ccCountryInfo(path).success(function(data) {
				countryResult = $q.defer.resolve(data);
			});
			var newPath = countryResult;
			return ccSearch(newPath);
		}
	})
*/
		
	