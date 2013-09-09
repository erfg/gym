'use strict';

describe('Controller: GroupActivitiesCtrl', function () {

  // load the controller's module
  beforeEach(module('gymApp'));

  var GroupActivitiesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupActivitiesCtrl = $controller('GroupActivitiesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
