'use strict';

// Declare app level module which depends on views, and components
var mainApp = angular.module('myApp', [
  'ngRoute', 'ngDialog', 'n3-line-chart', 'n3-pie-chart'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'DashboardCtrl'})
      .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'})
      .when('/logout', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'})
      .when('/manage', {
          templateUrl: 'manage/manage.html',
          controller: 'ManageCtrl'})
      .when('/users', {
          templateUrl: 'users/users.html',
          controller: 'UsersCtrl'})
      .when('/applications/:appId/users', {
          templateUrl: 'users/users.html',
          controller: 'UsersCtrl'});
}]);

mainApp.factory('TokenStorage', ['$window', function ($window) {
    var storageKey = 'auth_token';
    return {
        store: function (token) {
            return localStorage.setItem(storageKey, token);
        },
        retrieve: function () {
            return localStorage.getItem(storageKey);
        },
        clear: function () {
            return localStorage.removeItem(storageKey);
        },
        decode: function (token) {
            if (token === null) {
                return null;
            }
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        },
        isAuthenticated: function() {
            return !(localStorage.getItem(storageKey) === null);
        }
    };
}]);

mainApp.config(function ($httpProvider) {
    /**
     * FYI
     * The custom "X-Requested-With" is a conventional header sent by browser clients,
     * and it used to be the default in Angular but they took it out in 1.3.0.
     * Spring Security responds to it by not sending a "WWW-Authenticate" header in a 401 response,
     * and thus the browser will not pop up an authentication dialog (which is desirable in our app since
     * we want to control the authentication).
     * @type {string}
     */
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

mainApp.service('urls', function () {
    var domain = "http://51.255.48.55:8085/";
    var api = "api/";
    this.apiUrl = domain + api;
});


mainApp.factory('TokenAuthInterceptor', function ($q, TokenStorage) {
    return {
        request: function (config) {
            var authToken = TokenStorage.retrieve();
            if (authToken) {
                config.headers['X-AUTH-TOKEN'] = authToken;
            }
            return config;
        },
        responseError: function (error) {
            if (error.status === 401 || error.status === 403) {
                TokenStorage.clear();
            }
            return $q.reject(error);
        }
    }
}).config(['$httpProvider' , function ($httpProvider) {
    $httpProvider.interceptors.push('TokenAuthInterceptor');
}]);
