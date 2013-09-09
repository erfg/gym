'use strict';

angular.module('gymApp')
  .directive('map', function () {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
          attrs.$observe('lat', refresh);
          attrs.$observe('long', refresh);

          function refresh(){
              console.log("refresh");
              var mapOptions = {
                  zoom: attrs.zoom?parseInt(attrs.zoom):17,
                  center: new google.maps.LatLng(attrs.lat, attrs.long),
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  styles: [
                      {
                          "featureType": "water",
                          "stylers": [
                              { "saturation": -68 }
                          ]
                      },{
                          "featureType": "landscape",
                          "stylers": [
                              { "hue": "#ff0000" },
                              { "lightness": -13 },
                              { "saturation": 53 }
                          ]
                      },{
                          "featureType": "poi",
                          "stylers": [
                              { "hue": "#ff003b" },
                              { "lightness": -16 },
                              { "saturation": -38 }
                          ]
                      },{
                          "featureType": "road.highway",
                          "stylers": [
                              { "hue": "#ff0008" },
                              { "saturation": -62 }
                          ]
                      },{
                      }
                  ]
              };
              var map = new google.maps.Map(element[0], mapOptions);
          };
      }
    };
  });