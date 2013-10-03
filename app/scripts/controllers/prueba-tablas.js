'use strict';

angular.module('gymApp')
  .controller('PruebaTablasCtrl', function ($scope, GymDatasource) {

    $scope.rows = 20;
    $scope.datasource = GymDatasource.pruebas;

    $scope.rowsArray = function() {
        var result = new Array($scope.rows);
        return result;
    };
});
