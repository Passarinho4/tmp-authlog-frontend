'use strict';

angular.module('myApp')
    .controller('UsersCtrl', ['$scope', 'urls', '$http', '$routeParams', 'ngDialog', '$window',
        function($scope, urls, $http, $routeParams, ngDialog, $window) {

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

            $scope.refreshUsers = function () {
                if(undefined != $scope.appId) {
                    $http.get(urls.apiUrl + "applications/"+$scope.appId+"/users").then(
                        function successCallback(result) {
                            $scope.users = result.data;
                            console.log($scope.users)
                        },
                        function failureCallback(result) {
                            console.log("Can't get users from api.");
                        });
                }
            };

            $scope.refreshUsers();

            $scope.addPrivilegePopup = function (userId) {
                ngDialog.open({
                    template: 'users/popups/addPrivilege.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"userId": userId}
                });
            };

            $scope.deletePrivilegePopup = function (userId, privileges) {
                ngDialog.open({
                    template: 'users/popups/deletePrivilege.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"userId": userId, "privileges": privileges}
                });
            };
            
            $scope.createUserPopup = function (appId) {
                ngDialog.open({
                    template: 'users/popups/createUser.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"appId":appId}
                });
            };

            $scope.addPrivilege = function () {

                $http.post(urls.apiUrl + "users/" + $scope.ngDialogData.userId + "/privileges", [$scope.privilege]).then(
                    function successCallback(result) {
                        ngDialog.close();
                        $window.location.reload();
                    },
                    function failureCallback(result) {
                        console.log("Can't add privilege, something went wrong.");
                    });

            };

            $scope.deletePrivilege = function (privilege) {
                $http.delete(urls.apiUrl + "users/" + $scope.ngDialogData.userId + "/privileges/"+privilege).then(
                    function successCallback(result) {
                        ngDialog.close();
                        $window.location.reload();
                    },
                    function failureCallback(result) {
                        console.log("Can't remove privilege, something went wrong.");
                    });
            };
            
            $scope.createUser = function () {
                var userData = {};
                userData.username = $scope.username;
                userData.password = $scope.password;
                $http.post(urls.apiUrl + "applications/" + $scope.ngDialogData.appId + "/users", userData).then(
                    function successCallback(result) {
                        ngDialog.close();
                        $window.location.reload();
                    },
                    function failureCallback(result) {
                        console.log("Can't create new user, something went wrong");
                    });
                
            }

    }]);