!function(global) {
  'use strict';

  var init = function() {
    var tabs = $('.main a[data-toggle="tab"]');

    tabs.on('shown.bs.tab', function(e) {
      Utils.sendEvent('MyEyesView:ActivatedTab', {
        id: e.target.dataset.view
      });
    });

    // Initialize all tooltips on the page because tooltip data-apis is opt-in
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    Utils.sendEvent('MyEyesView:ActivatedTab', {
      id: 'map'
    });
  };

  global.MyEyesView = {
    init: init
  };

}(this);
