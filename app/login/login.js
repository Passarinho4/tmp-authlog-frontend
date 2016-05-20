'use strict';

angular.module('myApp')
.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
  var self = this
  
  $scope.loginFunction = function () {
    console.log($scope.login);
    console.log($scope.password)

    var config = {};
    config.headers = {};
    config.headers["Authorization"] = $scope.login + ":" + $scope.password;
        $http.get("http://51.255.48.55:8085/api/loginAdmin", config)
            .then(function successCallback(response) {
              console.log(response.headers("X-AUTH-TOKEN"))
      
    })
  }
  
}]);