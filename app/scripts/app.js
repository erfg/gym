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
      .when('/prueba-tablas', {
        templateUrl: 'views/prueba-tablas.html',
        controller: 'PruebaTablasCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
