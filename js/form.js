'use strict';

(function () {

  var uploadSection = document.querySelector('.upload');
  var cropForm = uploadSection.querySelector('.upload-overlay');
  var uploadForm = uploadSection.querySelector('#upload-select-image');
  var uploadFileBtn = uploadSection.querySelector('.upload-file');
  var uploadFile = uploadSection.querySelector('#upload-file');
  var scaleValueField = uploadSection.querySelector('.upload-resize-controls-value');
  var imgPreview = document.querySelector('.filter-image-preview');
  var filterSetup = document.querySelector('.upload-filter-controls');

  var changeScaleControl = uploadSection.querySelector('.upload-resize-controls');
  var initialScaleValue = 100;
  var step = 25;

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
    imgPreview.style.transform = 'scale(1)';
    scaleValueField.value = initialScaleValue + '%';
    window.createScale(changeScaleControl, step, initialScaleValue, scaleApply);
    e.target.setAttribute('aria-pressed', 'true');
  };

  var closeKeydownHadler = function (e) {
    if (window.utils.isDeactivateEvent(e)
      && uploadForm.classList.contains('invisible')) {
      filterInitState(e);
      toggleFormStatus(e);
      cropFormCancel.setAttribute('aria-pressed', 'true');
    }
  };

  var scaleApply = function (param) {
    imgPreview.style.transform = 'scale(' + param / 100 + ')';
  };

  document.addEventListener('DOMContentLoaded', function (e) {
    toggleFormStatus(e);
  });

  uploadFile.addEventListener('change', function (e) {
    toggleFormStatus(e);
    uploadFile.setAttribute('aria-pressed', 'true');
  });

  var cropFormCancel = uploadSection.querySelector('.upload-form-cancel');
  cropFormCancel.addEventListener('click', function (e) {
    e.preventDefault();
    filterInitState(e);
    toggleFormStatus(e);
  });

  window.initializeFilters(imgPreview, filterSetup);

  window.createScale(changeScaleControl, step, initialScaleValue, scaleApply);

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  window.load(DATA_URL, window.pictures);

})();

