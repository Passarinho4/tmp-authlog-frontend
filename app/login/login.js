'use strict';

angular.module('myApp')
.controller('LoginCtrl', ['$scope', '$http', 'TokenStorage', '$location', 'urls',
  function($scope, $http, TokenStorage, $location, urls) {
  var self = this;

      $http.get(urls.apiUrl + "logoutAdmin").then(
          function successCallback(response){
              TokenStorage.clear();
          },
          function failureCallback(response) {
              console.log("Can't logout properly.");
          }
      );


      $scope.loginFunction = function () {

          var config = {};
          config.headers = {};
          config.headers["Authorization"] = $scope.login + ":" + $scope.password;
          $http.get(urls.apiUrl + "application/"+urls.applicationId+"/login", config).then(
              function successCallback(response) {
                  TokenStorage.store(response.headers("X-AUTH-TOKEN"));
                  $location.path("/manage").replace();
              },
              function failureCallback(response) {
                  console.log("Can't login properly.")
              }
          )
      }
  
}]);