!function(exports) {
  'use strict';

  var listeners = {};
  var initialized = false;
  var URL = 'https://myeyes.firebaseio.com/';

  var coordinates;
  var events;
  var screenshots;

  var callHandlers = function(handlers, values) {
    var coordinatesValues = Promise.resolve(values || {});
    handlers && handlers.forEach(function(aHandler) {
      coordinatesValues.then(aHandler.method.bind(aHandler.context));
    });
  };

  function init() {
    if (initialized) {
      return;
    }

    initialized = true;

    LazyLoader.dependencyLoad([
      'https://cdn.firebase.com/js/client/2.3.1/firebase.js'
    ]).then(function() {
      var sessionRef = new Firebase(URL);

      var coordinatesRef = sessionRef.child('coordinates');
      coordinatesRef.on('value', function coordinatesUpdated(snapshot) {
        coordinates = snapshot.val();
        callHandlers(listeners.coordinates, coordinates);
      }, function onCancel(err) {
        console.error('Lost connection to Firebase. Reason: ', err);
        callHandlers(listeners.coordinates, coordinates);
      });

      var eventsRef = sessionRef.child('events');
      eventsRef.on('value', function eventsUpdated(snapshot) {
        events = snapshot.val();
        callHandlers(listeners.events, events);
      }, function onCancel(err) {
        console.error('Lost connection to Firebase. Reason: ', err);
        callHandlers(listeners.events, events);
      });

      var screenshotsRef = sessionRef.child('screenshots');
      screenshotsRef.on('value', function screenshotsUpdated(snapshot) {
        screenshots = snapshot.val();
        callHandlers(listeners.screenshots, screenshots);
      }, function onCancel(err) {
        console.error('Lost connection to Firebase. Reason: ', err);
        callHandlers(listeners.screenshots, screenshots);
      });
    });
  }

  function addEventListener(type, aHandler) {
    var context;
    if (!(type in listeners)) {
      listeners[type] = [];
    }

    var hd = aHandler;
    if (typeof hd === 'object') {
      context = hd;
      hd = hd.handleEvent;
    }

    if (hd) {
      listeners[type].push({
        method: hd,
        context: context
      });
    }
  }

  function removeEventListener(type, aHandler) {
    if (!(type in listeners)) {
      return false;
    }
    var handlers = listeners[type];
    if (handlers) {
      for (var i = 0, l = handlers.length; i < l; i++) {
        var thisHandler = aHandler;
        if (typeof thisHandler === 'object') {
          thisHandler = aHandler.handleEvent;
        }
        if (handlers[i].method === thisHandler) {
          handlers.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  };

  var FirebaseModel = {
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    init: init,
    get coordinates() {
      return coordinates;
    },
    get events() {
      return events;
    },
    get screenshots() {
      return screenshots;
    }
  };

  exports.FirebaseModel = FirebaseModel;

}(this);
