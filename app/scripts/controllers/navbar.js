'use strict';

angular.module('gymApp')
  .controller('NavbarCtrl', function ($scope, $route, $location) {
    $scope.$on('$routeChangeSuccess', function(){
        $scope.selectedTab = $location.path();
    });
  });
