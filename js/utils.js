'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isKeyboardEvent = function (e) {
    return typeof e.keyCode !== 'undefined';
  };

  return {
    isActivateEvent: function (e) {
      return isKeyboardEvent(e) && e.keyCode === ENTER_KEY_CODE;
    },

    isDeactivateEvent: function (e) {
      return isKeyboardEvent(e) && e.keyCode === ESCAPE_KEY_CODE;
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

})();
