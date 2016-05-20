'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/manage', {
        templateUrl: 'manage/manage.html',
        controller: 'ManageCtrl'});
}]);
