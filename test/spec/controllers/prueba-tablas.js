'use strict';

describe('Controller: PruebaTablasCtrl', function () {

  // load the controller's module
  beforeEach(module('gymApp'));

  var PruebaTablasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PruebaTablasCtrl = $controller('PruebaTablasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
