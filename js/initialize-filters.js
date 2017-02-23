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
      e.target.setAttribute('aria-pressed', 'true');
      elementPreview.style.filter = currentFilter;
      window.dragLevelFilters(currentFilter);
    };

    element.addEventListener('click', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.className === 'upload-filter-level-line'
        || e.target.className === 'upload-filter-level' || e.target.className === 'upload-filter-level-pin') {
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
        e.target.control.checked = true;
      }
    });
  };

})();
