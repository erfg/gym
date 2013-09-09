'use strict';

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyD7cUFz-WzzxZ0GRg4UXM-jxnfTttCE-uQ&sensor=false&' +
        'callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;