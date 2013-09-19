'use strict';

describe('Service: GymDatasource', function () {

  // load the service's module
  beforeEach(module('gymApp'));

  // instantiate service
  var GymDatasource;
  beforeEach(inject(function (_GymDatasource_) {
    GymDatasource = _GymDatasource_;
  }));

  it('should do something', function () {
    expect(!!GymDatasource).toBe(true);
  });

});
