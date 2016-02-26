!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/helpers/request.js',
      'js/models/firebase.js',
      'js/myEventsView.js'
    ]).then(function() {
      FirebaseModel.init();
      MyEventsView.init(FirebaseModel);
    });
  };

  global.MyEventsController = {
    init: init
  };

}(this);
