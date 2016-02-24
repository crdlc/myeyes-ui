!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/helpers/request.js',
      'js/models/firebase.js',
      'js/eventsView.js'
    ]).then(function() {
      FirebaseModel.init();
      EventsView.init(FirebaseModel);
    });
  };

  global.EventsController = {
    init: init
  };

}(this);
