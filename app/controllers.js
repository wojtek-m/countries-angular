/*global angular*/
/*global $http*/

var myApp = angular.module('countriesApp', []);

myApp.controller('countriesCtrl', function ($scope, $http) {
   $scope.country = {
       'name' : 'Poland',
       'capital' : 'Warsaw',
       'population' : 37000000
   }
   
   $http.get('countries.json').success(function(data) {
        $scope.countries = data;
   });

   
});