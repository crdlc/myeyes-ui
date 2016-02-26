
!function(global) {
  'use strict';

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
    var target = document.getElementById('myEventsList');
    target.innerHTML = '';

    events.forEach(function(event) {
      event.id === 'device_rasp_pi' && target.appendChild(createEventNode(event));
    });
  }

  var initialized = false;

  var init = function(model) {
    if (initialized) {
      return;
    }

    initialized = true;
    model.events && renderEvents(model.events);
    model.addEventListener('events', function(events) {
      renderEvents(events);
    });
  };

  global.MyEventsView = {
    init: init
  };

}(this);
