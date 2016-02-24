
!function(global) {
  'use strict';

  var createScreenshotNode = function(uri) {
    var container = document.createElement('div');
    container.classList.add('col-lg-3', 'col-md-4', 'col-xs-6', 'thumb');

    var anchor = document.createElement('a');
    anchor.classList.add('thumbnail');

    var img = document.createElement('img');
    img.classList.add('img-responsive');
    img.src = uri;

    anchor.appendChild(img);
    container.appendChild(anchor);

    return container;
  };

  var renderScreenshots = function(uris) {
    var target = document.getElementById('screenshotsList');
    target.innerHTML = '';

    uris.forEach(function(uri) {
      target.appendChild(createScreenshotNode(uri));
    });
  }

  var initialized = false;

  var init = function(model) {
    if (initialized) {
      return;
    }

    initialized = true;
    model.screenshots && renderScreenshots(model.screenshots);
    model.addEventListener('screenshots', function(screenshots) {
      renderScreenshots(screenshots);
    });
  };

  global.PicsView = {
    init: init
  };

}(this);
