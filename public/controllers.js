/*global angular*/
/*global Flickr*/
/*global $http*/
/*global $resource*/

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
   
   
   $http.get($routeParams.countryName + '.jsod').success(function(data) {
      // get dbPedia data (not working on c9.io due to https)
      $scope.db = data.d.results[0];
      $scope.db_population = data.d.results[0]['http://dbpedia.org/ontology/populationTotal'];
   }).error(function(err, data) {
     console.log(err);
   })
   
   // get Flickr images
   $http({
      method: 'GET',
      url: 'https://api.flickr.com/services/rest',
      params: {
         method: 'flickr.photos.search',
         api_key: 'fb4aacb85679883135400f881e7540be',
         text: $routeParams.countryName,
         tags: $routeParams.countryName,
         sort: 'interestingness-desc',
         format: 'json',
         nojsoncallback: 1
      }
   }).success(function(data){
      $scope.flickr = data;
   }).error(function(error) {
      console.log(error);
   })
   
   });
}]);