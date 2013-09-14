'use strict';

angular.module('gymApp')
    .directive('erfgMap', function (GoogleMaps) {
        return {
          restrict: 'EC',
          scope: {
              location: '='
          },
          link: function(scope, element, attrs) {
              scope.$watch('location', function(location) {
                  GoogleMaps.setZoom(attrs.zoom?parseInt(attrs.zoom):17);
                  GoogleMaps.setCenter(location?location.latitude:0, location?location.longitude:0);
                  GoogleMaps.render(element[0]);
              });
          }
    };
});
