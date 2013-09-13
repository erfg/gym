'use strict';

describe('Service: GoogleMaps', function () {

  // load the service's module
  beforeEach(module('gymApp'));

  // instantiate service
  var GoogleMaps;
  beforeEach(inject(function (_GoogleMaps_) {
    GoogleMaps = _GoogleMaps_;
  }));

  it('should do something', function () {
    expect(!!GoogleMaps).toBe(true);
  });

});
