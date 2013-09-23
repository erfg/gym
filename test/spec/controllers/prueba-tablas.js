'use strict';

describe('Controller: PruebaTablasCtrl', function () {

  // load the controller's module
//  beforeEach(module('gymApp'));

  var PruebaTablasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PruebaTablasCtrl = $controller('PruebaTablasCtrl', {
      $scope: scope
    });
  }));

});
