'use strict';

describe('Directive: erfg-map', function () {

  // load the directive's module
  beforeEach(module('gymApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<erfg-map></erfg-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the map directive');
  }));
});