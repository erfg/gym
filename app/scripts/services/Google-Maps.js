'use strict';

angular.module('gymApp')
  .service('GoogleMaps', function GoogleMaps() {

    this.mapOptions = {
        zoom: 0,
        center: {},
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

    this.setZoom = function(zoom) {
        this.mapOptions.zoom = zoom;
    }

    this.setCenter = function(latitude, longitude) {
        this.mapOptions.center = new google.maps.LatLng(latitude, longitude);
    }

    this.render = function(element) {
        var map = new google.maps.Map(element, this.mapOptions);
    }
  });
