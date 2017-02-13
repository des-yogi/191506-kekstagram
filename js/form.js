'use strict';

var uploadSection = document.querySelector('.upload');
var cropForm = uploadSection.querySelector('.upload-overlay');
var uploadForm = uploadSection.querySelector('#upload-select-image');
var uploadFileBtn = uploadSection.querySelector('.upload-file');

var imgPreview = document.querySelector('.filter-image-preview');
var filterSetup = document.querySelector('.upload-filter-controls');
var sizeOutputField = document.querySelector('.upload-resize-controls-value');

var toggleFormStatus = function (e) {
  cropForm.classList.toggle('invisible');
  uploadForm.classList.toggle('invisible');
  uploadFileBtn.focus();
  if (uploadForm.classList.contains('invisible')) {
    document.addEventListener('keydown', closeKeydownHadler);
  }
  if (cropForm.classList.contains('invisible')) {
    document.removeEventListener('keydown', closeKeydownHadler);
  }
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
  if (window.utils.isDeactivateEvent(e)
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

window.initializeFilters(imgPreview, filterSetup);

var changeScaleControl = uploadSection.querySelector('.upload-resize-controls');
var initialScaleValue = 100;
var step = 25;

window.createScale(changeScaleControl, step, initialScaleValue, scaleApply, sizeOutputField);
