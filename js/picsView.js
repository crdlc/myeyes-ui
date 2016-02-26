
!function(global) {
  'use strict';

  var createScreenshotNode = function(screenshot) {
    var container = document.createElement('div');
    container.classList.add('col-lg-3', 'col-md-4', 'col-xs-6', 'thumb');

    var anchor = document.createElement('a');
    anchor.classList.add('thumbnail');

    var img = document.createElement('img');
    img.classList.add('img-responsive');
    console.log(screenshot)
    img.src = 'data:image/jpeg;base64,' + screenshot.data;

    anchor.appendChild(img);
    container.appendChild(anchor);

    return container;
  };

  var renderScreenshots = function(screenshots) {
    var target = document.getElementById('screenshotsList');
    target.innerHTML = '';

    Object.keys(screenshots).forEach(function(key) {
      target.appendChild(createScreenshotNode(screenshots[key]));
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
