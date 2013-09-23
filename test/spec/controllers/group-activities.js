'use strict';

describe('Controller: GroupActivitiesCtrl', function () {

  var GroupActivitiesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupActivitiesCtrl = $controller('GroupActivitiesCtrl', {
      $scope: scope
    });
  }));

  it('should check that true is true', function () {
    expect(true).toBe(true);
  });
});
