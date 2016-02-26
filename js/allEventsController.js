!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/helpers/request.js',
      'js/models/firebase.js',
      'js/allEventsView.js'
    ]).then(function() {
      FirebaseModel.init();
      AllEventsView.init(FirebaseModel);
    });
  };

  global.AllEventsController = {
    init: init
  };

}(this);
