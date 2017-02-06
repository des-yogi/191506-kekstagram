'use strict';
/*
Функция должна содержать всю логику по применению фильтров к изображению:
выбор фильтра и отмену предыдущего, применение фильтра к изображению.
*/
window.initializeFilters = function (element) {
  var currentFilter = null;

  var setFilters = function (filterName, e) {
    if (currentFilter) {
      imgPreview.classList.remove(currentFilter);
      e.target.setAttribute('aria-pressed', 'false');
    }

    imgPreview.classList.add(filterName);
    currentFilter = filterName;
    e.target.setAttribute('aria-pressed', 'true');
  };

  filterSetup.addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT') {
      return;
    }
    var str = 'upload-';
    var filterName = e.target.parentElement.htmlFor.replace(str, '');
    setFilters(filterName, e);
  });

  filterSetup.addEventListener('keydown', function (e) {
    var str = 'upload-';
    var filterName = e.target.htmlFor.replace(str, '');
    if (isActivateEvent(e)) {
      setFilters(filterName, e);
    }
  });
};

