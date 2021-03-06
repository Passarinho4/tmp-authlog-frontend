'use strict';

angular.module('myApp')
    .controller('DashboardCtrl', ['$scope', 'urls', '$http', 'ngDialog', 'TokenStorage',
        function($scope, urls, $http, ngDialog, TokenStorage) {

            $scope.authenticated = TokenStorage.isAuthenticated();
            $scope.applications = [];
            $scope.refreshChart = refreshChart;

            $http.get(urls.apiUrl + "applications").then(
                function successCallback(result) {
                    $scope.applications = result.data;
                },
                function failureCallback(result) {
                    console.log("Can't get applications from api.");
                }
            );


            function refreshChart(appId) {
                console.log("oopopopo");
                $http.get(urls.apiUrl + "applications/"+appId+"/hourLoginStats").then(
                    function successCallback(result) {

                        console.log(result.data);

                        var dataset = result.data.map(function(pair) {return {x: new Date(pair.time), val_0: pair.amount}});

                        console.log(dataset);
                        $scope.data = { dataset0: dataset };

                        $scope.options = {
                            series: [
                                {
                                    axis: "y",
                                    dataset: "dataset0",
                                    key: "val_0",
                                    label: "An area series",
                                    color: "#1f77b4",
                                    type: ['column'],
                                    id: 'mySeries0'
                                }
                            ],
                            axes: {
                                x: {key: "x", type:"date"},
                                y: {min:0}

                            }
                        };
                    },
                    function failureCallback(result) {
                        console.log("Can't get stats from server.");
                    });
            }
            
}]);