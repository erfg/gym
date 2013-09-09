'use strict';

angular.module('gymApp', ['ngRoute', 'ngAnimate'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/group-activities', {
        templateUrl: 'views/group-activities.html',
        controller: 'GroupActivitiesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
