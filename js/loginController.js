!function(global) {
  'use strict';

  var init = function() {
    LazyLoader.dependencyLoad([
      'js/loginView.js'
    ]).then(function() {
      LoginView.init();
    });
  };

  global.LoginController = {
    init: init
  };

}(this);
