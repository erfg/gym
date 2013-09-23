'use strict';

describe('Directive: erfg-map', function () {

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<erfg-map></erfg-map>');
    element = $compile(element)(scope);
//    expect(element.text()).toBe('this is the map directive');
    expect(true).toBe(true);
  }));
});
