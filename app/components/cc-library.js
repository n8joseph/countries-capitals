angular.module('ccLibrary', [])

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
		
	