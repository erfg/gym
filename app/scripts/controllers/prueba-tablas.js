'use strict';

angular.module('gymApp')
  .controller('PruebaTablasCtrl', function ($scope, GymDatasource) {

    $scope.centers = GymDatasource.centers();
    $scope.selectedCenter = $scope.centers[0];

    $scope.terms = GymDatasource.termsForCenter($scope.selectedCenter);
    $scope.selectedTerm = $scope.terms[0];

    $scope.scheduleTypes = GymDatasource.scheduleTypesForCenterAndTerm($scope.selectedCenter, $scope.selectedTerm);
    $scope.selectedScheduleType = $scope.scheduleTypes[0];

    $scope.wholeWeek = GymDatasource.wholeWeek($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
    $scope.schedule = GymDatasource.scheduleForCenterTermAndScheduleType($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);

    $scope.$watch('selectedScheduleType', function (newValue) {
        $scope.wholeWeek = GymDatasource.wholeWeek($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
        $scope.schedule = GymDatasource.scheduleForCenterTermAndScheduleType($scope.selectedCenter, $scope.selectedTerm, $scope.selectedScheduleType);
    });
});
