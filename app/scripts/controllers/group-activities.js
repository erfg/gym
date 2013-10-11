'use strict';
var app = angular.module('gymApp');

app.controller('GroupActivitiesCtrl', function ($scope, GymDatasource) {

    $scope.selectedActivity = 'Selecciona la actividad a resaltar';
    $scope.selectedCenter = {};
    $scope.center = 'Vallecas';

    $scope.activities = GymDatasource.activitiesProv();
    $scope.datasource = GymDatasource.datasource;

    $scope.$watch('center', function (newValue) {
        $scope.selectedCenter = $scope.datasource[newValue];
    });
});