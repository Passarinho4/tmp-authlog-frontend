'use strict';

angular.module('myApp')
    .controller('DashboardCtrl', ['$scope', 'urls', '$http', 'ngDialog', 'TokenStorage',
        function($scope, urls, $http, ngDialog, TokenStorage) {

            $scope.authenticated = TokenStorage.isAuthenticated()

            $scope.data = {
                dataset0: [
                    {x: 0, val_0: 0, val_1: 0, val_2: 0, val_3: 0},
                    {x: 1, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347},
                    {x: 2, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991},
                    {x: 3, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509},
                    {x: 4, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167},
                    {x: 5, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136},
                    {x: 6, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923},
                    {x: 7, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625}
                ]
            };

            $scope.options = {
                series: [
                    {
                        axis: "y",
                        dataset: "dataset0",
                        key: "val_0",
                        label: "An area series",
                        color: "#1f77b4",
                        type: ['line', 'dot', 'area'],
                        id: 'mySeries0'
                    }
                ],
                axes: {x: {key: "x"}}
            };

            $http.get(urls.apiUrl + "applications/5730dd4bc9e77c000189ad7a/loginNumber?from=1465565537&to=1467207137").then(
                function successCallback(result) {
                    $scope.loginNumber = result.data.number;
                    console.log($scope.loginNumber);
                },
                function failureCallback(result) {
                    console.log();
                });

            $scope.pieData = [
                {label: "FBApps", value: $scope.loginNumber, color: "#1f77b4"},
                {label: "SimpleApps", value: 4, color: "#ff7f0e"},
                {label: "GoogleApps", value: 1, color: "#2ca02c"}
            ];
}]);