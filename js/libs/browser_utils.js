!function(exports) {

  'use strict';

  Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  Array.prototype.remove = function(element) {
    this.find(function(pElement, index, array) {
      if (pElement.id === element.id) {
        return array.splice(index, 1);
      }
    });
  };

  var sendEvent = function(eventName, data, target) {
    data = data ? { detail: data } : {};
    var newEvt = new CustomEvent(eventName, data);
    (target || exports).dispatchEvent(newEvt);
  };

  var addEventsHandlers = function(handlers, target) {
    Object.keys(handlers).forEach(function(eventName) {
      (target || exports).addEventListener(eventName, handlers[eventName]);
    });
  };

  var removeEventsHandlers = function(handlers, target) {
    Object.keys(handlers).forEach(function(eventName) {
      (target || exports).removeEventListener(eventName, handlers[eventName]);
    });
  };

  // Adds newValue to currValue and returns the new value:
  //  - if currValue is undefined, returns newValue
  //  - if currValue is an array, it makes currValue.push(newValue) and returns currValue
  //  - if currValue is not an array, creates a new one with that value, adds the new value
  //    and returns that
  function _addValue(currValue, newValue) {
    if (currValue === undefined) {
      return newValue;
    }
    if (!Array.isArray(currValue)) {
      currValue = [currValue];
    }
    currValue.push(newValue);
    return currValue;
  }

  // parses a URL search string. It returns an object that has a key the parameter name(s)
  // and as values either the value if the value is unique or an array of values if it exists
  // more than once on the search
  var parseSearch = function(aSearchStr) {
    aSearchStr = decodeStr(aSearchStr);
    return aSearchStr.slice(1).split('&').
      map(function(aParam) { return aParam.split('='); }).
      reduce(function(aObject, aCurrentValue) {
        var parName = aCurrentValue[0];
        aObject.params[parName] = _addValue(aObject.params[parName], aCurrentValue[1] || null);
        return aObject;
      },
      {
        params: {},
        getFirstValue: function(aParam) {
          return Array.isArray(this.params[aParam]) ? this.params[aParam][0] : this.params[aParam];
        }
      }
    );
  };

  // Aux function to generate a search str from an object with
  // key: value or key: [value1,value2] structure.
  function generateSearchStr(aObject, noIncludeQuestionMark) {
    return Object.keys(aObject).
      reduce(function(aPrevious, aParam, aIndex) {
        var value = aObject[aParam];
        value = Array.isArray(value) ? value : [value];
        value.forEach(function(aSingleValue, aValueIndex) {
          (aIndex + aValueIndex) && aPrevious.push('&');
          aPrevious.push(aParam);
          (aSingleValue || aSingleValue === 0) && aPrevious.push('=', aSingleValue);
        });
        return aPrevious;
      }, noIncludeQuestionMark ? [''] : ['?']).
      join('');
  }

  function decodeStr(str) {
    return str ? window.decodeURIComponent(str) : str;
  }

  /**
   * Please! remember this fc is a SHALLOW copy!!!
   */
  function shallowCopy(aObj) {
    if (!aObj) {
      return null;
    }

    var returnedValue = {};
    Object.keys(aObj).forEach(function(aKey) {
      returnedValue[aKey] = aObj[aKey];
    });
    return returnedValue;
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function copyValues(aDstObj, aSrcObj) {
    Object.keys(aSrcObj).forEach(function(key) {
      aDstObj[key] = aSrcObj[key];
    });
  }

  var setTransform = function(style, transform) {
    style.MozTransform = style.webkitTransform = style.msTransform = style.transform = transform;
  };

  var setDisabled = function(element, disabled) {
    element.disabled = disabled;
    disabled ? element.setAttribute('disabled', 'disabled') :
               element.removeAttribute('disabled');
  };

  var Utils = {
    sendEvent: sendEvent,
    addEventsHandlers: addEventsHandlers,
    removeEventsHandlers: removeEventsHandlers,
    parseSearch: parseSearch,
    generateSearchStr: generateSearchStr,
    decodeStr: decodeStr,
    shallowCopy: shallowCopy,
    setTransform: setTransform,
    setDisabled: setDisabled,
    copyValues: copyValues,
    isEmail: isEmail
  };

  // Just replacing global.utils might not be safe... let's just expand it...
  exports.Utils = exports.Utils || {};
  Object.keys(Utils).forEach(function (utilComponent) {
    exports.Utils[utilComponent] = Utils[utilComponent];
  });

}(this);
