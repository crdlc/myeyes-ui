!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/helpers/request.js',
      'js/models/firebase.js',
      'js/picsView.js'
    ]).then(function() {
      FirebaseModel.init();
      PicsView.init(FirebaseModel);
    });
  };

  global.PicsController = {
    init: init
  };

}(this);
