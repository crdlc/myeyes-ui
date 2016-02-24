!function(exports) {
  'use strict';

  var debug;

  var _views = {
    'myeyes': {
      mainView: 'MyEyesController',
      dependencies: [
        'MyEyesController'
      ]
    },
    'login': {
      mainView: 'LoginController',
      dependencies: [
        'LoginController'
      ]
    }
  };

  function getPath() {
    return exports.document.body.dataset.view;
  }

  function getView() {
    var pathViews = Object.keys(_views);
    var numViews = pathViews.length;
    var path = getPath();
    for (var i = 0; i < numViews; i++) {
      if (path.startsWith(pathViews[i]) &&
        _views[pathViews[i]].
          dependencies.
          every(function(dependency) {
            return !!exports[dependency];
          })) {
        return exports[_views[pathViews[i]].mainView];
      }
    }
    return null;
  }

  function init() {
    var view = getView();
    if (view) {
      view.init();
    } else {
      console.error('Couldn\'t find a view for ' + exports.document.location.pathname);
    }
  };

  exports.MyEyesApp = {
    init: init
  };

}(this);

this.addEventListener('load', function startApp() {
  // Check that everything was loaded correctly, or just use LazyLoader here...
  LazyLoader.load([
    'js/libs/browser_utils.js',
    'js/loginController.js',
    'js/myEyesController.js'
  ]).then(function() {
    MyEyesApp.init();
  });
});
