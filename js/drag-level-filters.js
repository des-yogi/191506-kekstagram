'use strict';

window.dragLevelFilters = (function () {

  return function () {
    var filterLevelLine = document.querySelector('.upload-filter-level');
    var filterPin = document.querySelector('.upload-filter-level-pin');
    var filterLevel = document.querySelector('.upload-filter-level-val');
    var imgPreview = document.querySelector('.filter-image-preview');
    filterLevelLine.classList.remove('invisible');

    filterPin.onmousedown = function(e) {
      var pinCoords = getCoords(filterPin);
      var shiftX = e.pageX - pinCoords.left;

      var sliderCoords = getCoords(filterLevelLine);

      document.onmousemove = function(e) {

        var newLeft = e.pageX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = filterLevelLine.offsetWidth - filterPin.offsetWidth - filterPin.clientWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        filterPin.style.left = newLeft + 'px';
        filterLevel.style.width = newLeft + 'px';
      };

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      return false;
    };

    filterPin.ondragstart = function() {
      return false;
    };

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        left: box.left + pageXOffset
      };

    }

  };

})();
