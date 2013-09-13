'use strict';

angular.module('gymApp')
  .directive('map', function (GoogleMaps) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {

          scope.$watch('center', function() {
              renderMap(attrs.latitude?attrs.latitude:0, attrs.longitude?attrs.longitude:0, attrs.zoom?parseInt(attrs.zoom):17);
          });

          function renderMap(latitude, longitude, zoom){
              GoogleMaps.setCenter(latitude, longitude);
              GoogleMaps.setZoom(zoom);
              GoogleMaps.render(element[0]);
          }
      }
    };
  });
