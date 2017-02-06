'use strict';
/*
Функция должна содержать всю логику по применению фильтров к изображению:
выбор фильтра и отмену предыдущего, применение фильтра к изображению.
*/
var ENTER_KEY_CODE = 13;
/* var imgPreview = document.querySelector('.filter-image-preview');
var filterSetup = document.querySelector('.upload-filter-controls');*/

var isActivateEvent = function (e) {
  return e.keyCode && e.keyCode === ENTER_KEY_CODE;
};

window.initializeFilters = function (elementPreview, element) {
  var currentFilter = null;

  var setFilters = function (filterName, e) {
    if (currentFilter) {
      elementPreview.classList.remove(currentFilter);
      e.target.setAttribute('aria-pressed', 'false');
    }

    elementPreview.classList.add(filterName);
    currentFilter = filterName;
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
    if (isActivateEvent(e)) {
      setFilters(filterName, e);
    }
  });
};
