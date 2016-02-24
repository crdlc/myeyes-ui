!function(global) {
  'use strict';

  var goTo = function(evt) {
    var id = evt.detail.id;
    return LazyLoader.load([
      'js/' + id + 'Controller.js'
    ]).then(function() {
      return global[id.charAt(0).toUpperCase() + id.slice(1) + 'Controller'].init()
    });
  };

  var handlers = {
    'MyEyesView:ActivatedTab': goTo
  };

  var init = function() {
    LazyLoader.load([
      'js/myEyesView.js'
    ]).then(function() {
      Utils.addEventsHandlers(handlers);
      MyEyesView.init();
    });
  };

  global.MyEyesController = {
    init: init
  };

}(this);
