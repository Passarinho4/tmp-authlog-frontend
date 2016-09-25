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

            $scope.editUserPopup = function (user, appId) {
                ngDialog.open({
                    template: 'users/popups/editUser.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"appId": appId, "user": user}
                })
            };

            $scope.editUser = function () {
                var userData = {};
                userData.mail = $scope.ngDialogData.user.mail;
                userData.gender = $scope.ngDialogData.user.gender;
                userData.locale = $scope.ngDialogData.user.locale;
                $http.put(urls.apiUrl + "applications/" + $scope.ngDialogData.appId + "/users/" + $scope.ngDialogData.user.username, userData).then(
                    function successCallback(result) {
                        ngDialog.close();
                        console.log("Done.")
                    },
                    function failureCallback(result) {
                        console.log("Error.");
                    });

            };

            $scope.changePicturePopup = function (user, appId) {
                ngDialog.open({
                    template: 'users/popups/changePicture.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"appId": appId, "user": user}
                })
            };

            $scope.changePicture = function () {
                var form = new FormData();
                form.append("file", $scope.ngDialogData.user.picture);
                console.log($scope.ngDialogData.user.picture);
                $http.post(urls.apiUrl + "applications/" + $scope.ngDialogData.appId + "/users/" + $scope.ngDialogData.user.id + "/photo",
                    form, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(
                    function successCallback(result) {
                        ngDialog.close();
                        console.log("Picture changed")
                    },
                    function failureCallback(result) {
                        console.log("Error during changing picture");
                    });

            };
            
            $scope.deleteUser = function(user, appId) {
                $http.delete(urls.apiUrl + "applications/" + appId + "/users/" + user.username).then(
                    function successCallback(result) {
                        console.log("Removed")
                    },
                    function failureCallback(result) {
                        console.log("Error");
                    });
            };

            $scope.addPrivilegePopup = function (userId, appId) {
                ngDialog.open({
                    template: 'users/popups/addPrivilege.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"userId": userId, "appId": appId}
                });
            };

            $scope.deletePrivilegePopup = function (userId, appId, privileges) {
                ngDialog.open({
                    template: 'users/popups/deletePrivilege.html',
                    className: 'ngdialog-theme-default',
                    controller: 'UsersCtrl',
                    data: {"userId": userId, "appId": appId, "privileges": privileges}
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

                $http.post(urls.apiUrl + "applications/" + $scope.ngDialogData.appId + "/users/" + $scope.ngDialogData.userId + "/privileges", [$scope.privilege]).then(
                    function successCallback(result) {
                        ngDialog.close();
                        $window.location.reload();
                    },
                    function failureCallback(result) {
                        console.log("Can't add privilege, something went wrong.");
                    });

            };

            $scope.deletePrivilege = function (privilege) {
                $http.delete(urls.apiUrl + "applications/" + $scope.ngDialogData.appId + "/users/" + $scope.ngDialogData.userId + "/privileges/"+privilege).then(
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