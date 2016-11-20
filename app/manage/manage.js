'use strict';

angular.module('myApp')
    .controller('ManageCtrl', ['$scope', 'urls', '$http', 'ngDialog', function ($scope, urls, $http, ngDialog) {

        var vm = this;

        vm.applications = [];

        vm.refreshApplications = function () {
            $http.get(urls.apiUrl + "applications").then(
                function successCallback(response) {
                    vm.applications = response.data;
                    console.log(response.data);
                },
                function failureCallback() {
                    console.log("Something went wrong! Can't get data from server.");
                }
            )
        };

        vm.createApplicationPopup = function () {
            ngDialog.open({
                template: 'manage/popups/createApplication.html',
                className: 'ngdialog-theme-default',
                controller: 'ManageCtrl',
                preCloseCallback: vm.refreshApplications,
                controllerAs: 'vm'
            });
        };

        vm.updateApplicationPopup = function (appId) {
            ngDialog.open({
                template: 'manage/popups/updateApplication.html',
                className: 'ngdialog-theme-default',
                controller: 'ManageCtrl',
                controllerAs: 'vm',
                preCloseCallback: vm.refreshApplications,
            data: {"appId": appId}
            });
        };

        vm.addApplication = function () {

            var app = {};
            app.facebookAppId = vm.facebookAppId;
            app.facebookRedirectURI = vm.facebookRedirectURI;
            app.facebookSecret = vm.facebookSecret;
            app.name = vm.applicationName;

            $http.post(urls.apiUrl + "applications", app).then(
                function successCallback(response) {
                    ngDialog.closeAll();
                },
                function failureCallback() {
                    console.log("Something went wrong! Can't add new application.");
                }
            )
        };

        vm.updateApplication = function () {
            var app = {};
            app.facebookAppId = vm.facebookAppId;
            app.facebookRedirectURI = vm.facebookRedirectURI;
            app.facebookSecret = vm.facebookSecret;
            app.name = vm.applicationName;

            $http.put(urls.apiUrl + "applications/" + $scope.ngDialogData.appId, app).then(
                function successCallback(result) {
                    ngDialog.closeAll();
                    vm.refreshApplications();
                },
                function failureCallback(result) {
                    console.log(result);
                });
        };

        vm.deleteApplication = function (appId) {
            $http.delete(urls.apiUrl + "applications/" + appId).then(
                function successCallback(response) {
                    vm.refreshApplications();
                },
                function failureCallback() {
                    console.log("Something went wrong! Can't delete application.")
                }
            )
        };

        vm.refreshApplications();

    }]);