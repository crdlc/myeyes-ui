!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/models/firebase.js',
      'js/mapView.js'
    ]).then(function() {
      FirebaseModel.init();
      MapView.init(FirebaseModel);
    });
  };

  global.MapController = {
    init: init
  };

}(this);
