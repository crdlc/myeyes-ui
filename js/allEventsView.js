
!function(global) {
  'use strict';

  var events = [];

  var createEventNode = function(data) {
    var anchor = document.createElement('a');
    anchor.classList.add('list-group-item');

    var description = document.createElement('h4');
    description.classList.add('list-group-item-heading');
    description.textContent = data.description;

    var where = document.createElement('p');
    where.classList.add('list-group-item-text');
    where.textContent = data.lat + ', ' + data.lng;
    Request.getCivilAddress(data).then(function(response) {
      if (response && Array.isArray(response.results) && response.results.length) {
        where.textContent = response.results[0].formatted;
      }
    });

    anchor.appendChild(description);
    anchor.appendChild(where);

    return anchor;
  };

  var renderEvents = function(events) {
    var target = document.getElementById('allEventsList');
    target.innerHTML = '';

    events.forEach(function(event) {
      target.appendChild(createEventNode(event));
    });
  };

  var addMarker = function(map, bounds, event) {
    bounds.extend(new google.maps.LatLng(event.lat, event.lng));

    var marker = new google.maps.Marker({
      position: event,
      label: event.description,
      animation: google.maps.Animation.DROP
    });

    var infowindow = new google.maps.InfoWindow({
      content: '<b>' + event.description + '</b>'
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    marker.setMap(map);
  }

  var onSeeAllEventsClicked = function() {
    var modal = $('.modal.modal-map');
    modal.on('shown.bs.modal', function (e) {
      var map = new google.maps.Map(document.getElementById('allEventsLocation'), {
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      });

      var bounds = new google.maps.LatLngBounds();

      events.forEach(function(event) {
        addMarker(map, bounds, event);
      });

      map.fitBounds(bounds);
    })
    modal.modal('show');
  };

  var addHandlers = function() {
    document.getElementById('seeAllEventsMap').addEventListener('click', onSeeAllEventsClicked);
  };

  var initialized = false;

  var init = function(model) {
    if (initialized) {
      return;
    }

    initialized = true;
    events = model.events;
    events && renderEvents(events);
    model.addEventListener('events', function(pEvents) {
      events = pEvents;
      renderEvents(events);
    });

    addHandlers();
  };

  global.AllEventsView = {
    init: init
  };

}(this);
