/*global angular*/
/*global $http*/

var countriesControllers = angular.module('countriesControllers', []);

countriesControllers.controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
   $http.get('countries.json').success(function(data) {
        $scope.countries = data;
        $scope.countriesOrder = 'name.common';
   });
}]);

countriesControllers.controller('ProfileCtrl', ['$scope', '$http', '$filter', '$routeParams', function ($scope, $http, $filter, $routeParams) {
   $http.get('countries.json').success(function(data) {
      // find the country using filter and common name
      $scope.country = $filter('filter')(data, function(item) {
         return item.name.common === $routeParams.countryName;
      })[0];
   });
}]);