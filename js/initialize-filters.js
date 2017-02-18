'use strict';

window.initializeFilters = (function () {
  return function (elementPreview, element) {
    var currentFilter = null;

    var setFilters = function (filterName, e) {
      if (currentFilter) {
        elementPreview.classList.remove(currentFilter);
        e.target.setAttribute('aria-pressed', 'false');
      }

      elementPreview.classList.add(filterName);
      currentFilter = filterName;
      e.target.control.checked = true;
      e.target.setAttribute('aria-pressed', 'true');
    };

    element.addEventListener('click', function (e) {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      var str = 'upload-';
      var filterName = e.target.parentElement.htmlFor.replace(str, '');
      setFilters(filterName, e);
    });

    element.addEventListener('keydown', function (e) {
      var str = 'upload-';
      var filterName = e.target.htmlFor.replace(str, '');
      if (window.utils.isActivateEvent(e)) {
        setFilters(filterName, e);
      }
    });
  };

})();
