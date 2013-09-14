'use strict';

angular.module('gymApp')
    .directive('map', function (GoogleMaps) {
        return {
          restrict: 'E',
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
