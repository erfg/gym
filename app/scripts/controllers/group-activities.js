'use strict';
var app = angular.module('gymApp');

app.controller('GroupActivitiesCtrl', function ($scope, GymDatasource) {

    function reloadTerms() {
        $scope.terms = GymDatasource.termsForCenter($scope.selectedCenter);
        $scope.termsShow = $scope.terms.length > 1;
        if ($scope.terms.indexOf($scope.selectedTerm) < 0) {
            $scope.selectedTerm = $scope.terms[0];
        } else {
            reloadScheduleTypes();
        }
    }

    function reloadScheduleTypes() {
        $scope.scheduleTypes = GymDatasource.scheduleTypesForCenterAndTerm($scope.selectedCenter, $scope.selectedTerm);
        $scope.scheduleTypesShow = $scope.scheduleTypes.length > 1;
        if ($scope.scheduleTypes.indexOf($scope.selectedScheduleType) < 0) {
            $scope.selectedScheduleType = $scope.scheduleTypes[0];
        } else {
            reloadScheduleAndActivities();
        }
    }

    function reloadScheduleAndActivities() {
        $scope.daysInWeek = GymDatasource.daysInWeek($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
        $scope.schedule = GymDatasource.scheduleForCenterTermAndScheduleType($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
        $scope.activities = GymDatasource.activities($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
        $scope.activitiesShow = $scope.activities.length > 1;
        if ($scope.activities.indexOf($scope.selectedActivity) < 0) {
            $scope.selectedActivity = $scope.activityDefault;
        }
    }

    $scope.activityDefault = "Selecciona la actividad a resaltar";

    $scope.centers = GymDatasource.centers();
    $scope.centersShow = $scope.centers.length > 1;
    $scope.selectedCenter = $scope.centers[0];

    $scope.$watch('selectedCenter', function (newValue) {
        $scope.contactInfoForCenter = GymDatasource.contactInfoForCenter(newValue);
        reloadTerms();
    });

    $scope.$watch('selectedTerm', function (newValue) {
        reloadScheduleTypes();
    });

    $scope.$watch('selectedScheduleType', function (newValue) {
        reloadScheduleAndActivities();
    });
});