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
      .when('/prices', {
        templateUrl: 'views/prices.html',
        controller: 'PricesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
