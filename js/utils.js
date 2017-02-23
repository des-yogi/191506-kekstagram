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
    },

    cloneArr: function (arr) {
      return arr.slice(0);
    },

    makeShuffle: function (arr) {
      var i;
      var temp;
      var j;
      for (i = 0; i < arr.length; i++) {
        j = ~~(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    },

    onValueChanged: function (filterName, currentFilterAmount) {
      var picture = document.querySelector('.filter-image-preview');
      switch (filterName) {
        case 'filter-none':
          picture.style.filter = '';
          break;
        case 'filter-chrome':
          picture.style.filter = 'grayscale(' + currentFilterAmount + ')';
          break;
        case 'filter-sepia':
          picture.style.filter = 'sepia(' + currentFilterAmount + ')';
          break;
        case 'filter-marvin':
          picture.style.filter = 'invert(' + currentFilterAmount + ')';
          break;
        case 'filter-phobos':
          picture.style.filter = 'hue-rotate(' + (currentFilterAmount * 360) + 'deg)';
          break;
        case 'filter-heat':
          picture.style.filter = 'saturate(' + (currentFilterAmount * 3) + ')';
          break;
        default:
          picture.style.filter = '';
          break;
      }
    }

  };

})();
