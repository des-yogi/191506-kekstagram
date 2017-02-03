'use strict';

var uploadSection = document.querySelector('.upload');
var cropForm = uploadSection.querySelector('.upload-overlay');
var uploadForm = uploadSection.querySelector('#upload-select-image');

var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var toggleFormStatus = function (e) {
  cropForm.classList.toggle('invisible');
  uploadForm.classList.toggle('invisible');
  if (uploadForm.classList.contains('invisible')) {
    document.addEventListener('keydown', closeKeydownHadler);
  }
  if (cropForm.classList.contains('invisible')) {
    document.removeEventListener('keydown', closeKeydownHadler);
  }
};

var isActivateEvent = function (e) {
  return e.keyCode && e.keyCode === ENTER_KEY_CODE;
};

var filterInitState = function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-none');
  if (imgPreview.style.transform !== 'scale(1)') {
    imgPreview.style.transform = 'scale(1)';
  }
  e.target.setAttribute('aria-pressed', 'true');
};

var closeKeydownHadler = function (e) {
  if (e.keyCode && e.keyCode === ESCAPE_KEY_CODE
    && uploadForm.classList.contains('invisible')) {
    toggleFormStatus(e);
    cropFormCancel.setAttribute('aria-pressed', 'true');
    filterInitState(e);
  }
};

document.addEventListener('DOMContentLoaded', function (e) {
  toggleFormStatus(e);
});

var uploadFile = uploadSection.querySelector('#upload-file');

uploadFile.addEventListener('change', function (e) {
  toggleFormStatus(e);
  uploadFile.setAttribute('aria-pressed', 'true');
});

var cropFormCancel = uploadSection.querySelector('.upload-form-cancel');

cropFormCancel.addEventListener('click', function (e) {
  toggleFormStatus(e);
  cropFormCancel.setAttribute('aria-pressed', 'true');
  filterInitState(e);
});

var imgPreview = uploadSection.querySelector('.filter-image-preview');
var filterSetup = uploadSection.querySelector('.upload-filter-controls');
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
  var filterName = e.target.parentElement.htmlFor.replace(/upload-/, '');
  setFilters(filterName, e);
});

filterSetup.addEventListener('keydown', function (e) {
  var filterName = e.target.htmlFor.replace(/upload-/, '');
  if (isActivateEvent(e)) {
    setFilters(filterName, e);
  }
});

var resizePlusBtn = uploadSection.querySelector('.upload-resize-controls-button-inc');
var resizeMinusBtn = uploadSection.querySelector('.upload-resize-controls-button-dec');
var sizeOutputField = uploadSection.querySelector('.upload-resize-controls-value');
sizeOutputField.value = '100%';
sizeOutputField.step = 25;

resizePlusBtn.addEventListener('click', function (e) {
  if (parseInt(sizeOutputField.value, 10) < 100) {
    sizeOutputField.value = parseInt(sizeOutputField.value, 10) + parseInt(sizeOutputField.step, 10) + '%';
    imgPreview.style.transform = 'scale(' + parseInt(sizeOutputField.value, 10) / 100 + ')';
  }

});

resizeMinusBtn.addEventListener('click', function (e) {
  if (parseInt(sizeOutputField.value, 10) > 25) {
    sizeOutputField.value = parseInt(sizeOutputField.value, 10) - sizeOutputField.step + '%';
    imgPreview.style.transform = 'scale(' + parseInt(sizeOutputField.value, 10) / 100 + ')';
  }
});
