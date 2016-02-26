
!function(global) {
  'use strict';

  var marker = null;
  var map = null;

  var setPosition = function(coordinates) {
    if (!coordinates || !coordinates.lat || !coordinates.lng) {
      return;
    }

    marker ? marker.setMap(null) : map.setCenter(coordinates);
    marker = new google.maps.Marker({
      position: coordinates,
      title: 'User is here'
    });

    marker.setMap(map);
    map.panTo(coordinates);
  }

  var init = function(model) {
    if (map) {
      return;
    }

    map = new google.maps.Map(document.getElementById('userLocation'), {
      scrollwheel: false,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    setPosition(model.coordinates);
    model.addEventListener('coordinates', function(coordinates) {
      setPosition(coordinates);
    });
  };

  global.MapView = {
    init: init
  };

}(this);
