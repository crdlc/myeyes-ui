!function(global) {
  'use strict';

  function sendXHR(aType, aURL, aData, aDataType) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(aType, aURL);
      xhr.responseType = 'json';
      xhr.overrideMimeType && xhr.overrideMimeType('application/json');
      if (aDataType) {
        // Note that this requires
        xhr.setRequestHeader('Content-Type', aDataType);
        aData && xhr.setRequestHeader('Content-Length', aData.length);
      }

      xhr.onload = function (aEvt) {
        if (xhr.status === 200) {
          var response = xhr.response;
          if (typeof xhr.response === 'string') {
            response = JSON.parse(response);
          }
          resolve(response);
        } else {
          reject({ status: xhr.status, statusText: xhr.statusText, response: xhr.response });
        }
      };

      xhr.onerror = function (aEvt) {
        console.error('sendXHR. XHR failed ' + JSON.stringify(aEvt) + 'url: '+
                    aURL + ' Data: ' + aData + ' RC: ' + xhr.responseCode);
        reject(aEvt.target);
      };

      xhr.send(aData);
    });
  }

  function getCivilAddress(coords) {
    return sendXHR('GET', 'http://api.opencagedata.com/geocode/v1/json?q=' + coords.lat + '+' +
                    coords.lng + '&key=fd0ca1ebd55959fa68ae6e6b191a0bd8', 'application/json');
  }

  var Request = {
    getCivilAddress: getCivilAddress
  };

  global.Request = Request;

}(this);
