'use strict';

angular.module('myApp')
.controller('ManageCtrl', ['$scope', 'urls', '$http', 'ngDialog', function($scope, urls, $http, ngDialog) {

    $scope.applications = [];

    $scope.refreshApplications = function () {
        $http.get(urls.apiUrl + "applications").then(
            function successCallback(response) {
                $scope.applications = response.data;
            },
            function failureCallback() {
                console.log("Something went wrong! Can't get data from server.");
            }
        )
    };

    $scope.createApplicationPopup = function () {
        ngDialog.open({
            template: 'manage/popups/createApplication.html',
            className: 'ngdialog-theme-default',
            controller: 'ManageCtrl' });
    };

    $scope.addApplication = function () {

        var app = {};
        app.facebookAppId = $scope.facebookAppId;
        app.facebookRedirectURI = $scope.facebookRedirectURI;
        app.secret = $scope.secret;

        $http.post(urls.apiUrl + "applications", app).then(
            function successCallback(response) {
                alert("Dodano poprawnie!");
                ngDialog.closeAll();
            },
            function failureCallback() {
                console.log("Something went wrong! Can't add new application.");
            }
        )
    };

    $scope.deleteApplication = function (appId) {
        $http.delete(urls.apiUrl + "applications/" + appId).then(
            function successCallback(response) {
                $scope.refreshApplications();
            },
            function failureCallback() {
                console.log("Something went wrong! Can't delete application.")
            }
        )
    };




    $scope.refreshApplications();

}]);