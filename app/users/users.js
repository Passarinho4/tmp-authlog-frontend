'use strict';

angular.module('myApp')
    .controller('UsersCtrl', ['$scope', 'urls', '$http', '$routeParams',
        function($scope, urls, $http, $routeParams) {

            $scope.applications = [];
            $scope.users = [];
            $scope.appId = $routeParams.appId;

            $http.get(urls.apiUrl + "applications").then(
                function successCallback(result) {
                    $scope.applications = result.data;
                },
                function failureCallback(result) {
                    console.log("Can't get applications from api.");
                }
            );


            if(undefined != $scope.appId) {
                $http.get(urls.apiUrl + "applications/"+$scope.appId+"/users").then(
                    function successCallback(result) {
                        $scope.users = result.data;
                    },
                    function failureCallback(result) {
                        console.log("Can't get users from api.");
                    });
            }

    }]);