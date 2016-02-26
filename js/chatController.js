!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/models/firebase.js',
      'js/chatView.js'
    ]).then(function() {
      FirebaseModel.init();
      ChatView.init(FirebaseModel);
    });
  };

  global.ChatController = {
    init: init
  };

}(this);
