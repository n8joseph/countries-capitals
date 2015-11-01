angular.module('ccApp', ['ccAppViews', 'ngRoute'])
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise({
			redirectTo : '/'
		});
	})
	.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.directive('suchHref', ['$location', function ($location) {
  		return{
		    restrict: 'A',
		    link: function (scope, element, attr) {
		      element.attr('style', 'cursor:pointer');
		      element.on('click', function(){
		        $location.url(attr.suchHref)
		        scope.$apply();
		      });
		    }
		  }
	}]);