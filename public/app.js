/*global angular*/

(function(){
    'use strict';
    
    var countriesApp = angular.module('countriesApp', [
        'ngMaterial',
        'ngRoute',
        'ngResource',
        'countriesControllers'
    ]);
    
    countriesApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/list.html',
            controller: 'ListCtrl'
        }).
        when('/:countryName', {
            templateUrl: 'partials/countryProfile.html',
            controller: 'ProfileCtrl'
        }).
        otherwise({
            redirectTo: '/'
        })
    }]);
    
})();
