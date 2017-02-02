'use strict';

// Подготовка: Показ формы кадрирования:
// В разметке скройте блок с формой кадрирования .upload-overlay,
// добавив ему класс invisible и покажите вместо него форму загрузки
// изображения #upload-select-image
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

// Показ формы кадрирования:
// При изменении значения поля загрузки фотографии #upload-file
// в форме #upload-select-image, показывается форма кадрирования
// изображения, а форма загрузки скрывается
var uploadFile = uploadSection.querySelector('#upload-file');

uploadFile.addEventListener('change', function (e) {
  toggleFormStatus(e);
  uploadFile.setAttribute('aria-pressed', 'true');
});

// Закрытие формы кадрирования.
// При нажатии на кнопку .upload-form-cancel форма кадрирования закрывается
// и покаызывается форма загрузки изображения
var cropFormCancel = uploadSection.querySelector('.upload-form-cancel');

cropFormCancel.addEventListener('click', function (e) {
  toggleFormStatus(e);
  cropFormCancel.setAttribute('aria-pressed', 'true');
  filterInitState(e);
});

// Применение фильтра к изображению:
// При смене фильтра, выбором одного из значений среди радиокнопок
// upload-filter, добавить картинке .filter-image-preview CSS-класс,
// соответствующий фильтру. Название CSS класса повторяет название
// значение выбранного фильтра без префикса upload. Например, если выбран
// фильтр upload-filter-chrome, изображению нужно добавить класс filter-chrome
var filterNone = uploadSection.querySelector('#upload-filter-none');
var filterChrome = uploadSection.querySelector('#upload-filter-chrome');
var filterSepia = uploadSection.querySelector('#upload-filter-sepia');
var filterMarvin = uploadSection.querySelector('#upload-filter-marvin');
var filterPhobos = uploadSection.querySelector('#upload-filter-phobos');
var filterHeat = uploadSection.querySelector('#upload-filter-heat');
var imgPreview = uploadSection.querySelector('.filter-image-preview');
var filterSetup = uploadSection.querySelector('.upload-filter-controls');

var filterInitState = function (e) {
  filterNone.setAttribute('checked', 'checked');
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-none');
  if (imgPreview.style.transform !== 'scale(1)') {
    imgPreview.style.transform = 'scale(1)';
  }
  e.target.setAttribute('aria-pressed', 'true');
};

var filterChromeSet = function (e) {
  imgPreview.classList.remove('filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-chrome');
  e.target.setAttribute('aria-pressed', 'true');
};

var filterSepiaSet = function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-sepia');
  e.target.setAttribute('aria-pressed', 'true');
};

var filterMarvinSet = function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-marvin');
  e.target.setAttribute('aria-pressed', 'true');
};

var filterPhobosSet = function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-heat');
  imgPreview.classList.add('filter-phobos');
  e.target.setAttribute('aria-pressed', 'true');
};

var filterHeatSet = function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-phobos', 'filter-marvin');
  imgPreview.classList.add('filter-heat');
  e.target.setAttribute('aria-pressed', 'true');
};


filterSetup.addEventListener('click', function (e) {
  if (e.target === filterNone) {
    filterInitState(e);
  }
  if (e.target === filterChrome) {
    filterChromeSet(e);
  }
  if (e.target === filterSepia) {
    filterSepiaSet(e);
  }
  if (e.target === filterMarvin) {
    filterMarvinSet(e);
  }
  if (e.target === filterPhobos) {
    filterPhobosSet(e);
  }
  if (e.target === filterHeat) {
    filterHeatSet(e);
  }
});

filterSetup.addEventListener('keydown', function (e) {
  if (isActivateEvent(e) && e.target === filterNone) {
    filterInitState(e);
  }
  if (isActivateEvent(e) && e.target === filterChrome) {
    filterChromeSet(e);
  }
  if (isActivateEvent(e) && e.target === filterSepia) {
    filterSepiaSet(e);
  }
  if (isActivateEvent(e) && e.target === filterMarvin) {
    filterMarvinSet(e);
  }
  if (isActivateEvent(e) && e.target === filterPhobos) {
    filterPhobosSet(e);
  }
  if (isActivateEvent(e) && e.target === filterHeat) {
    filterHeatSet(e);
  }
});

/* filterNone.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-none');
});
filterNone.addEventListener('keydown', function (e) {
  if (isActivateEvent(e)) {
    imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
    imgPreview.classList.add('filter-none');
  }
});

filterChrome.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-chrome');
});
filterChrome.addEventListener('keydown', function (e) {
  if (isActivateEvent(e)) {
    imgPreview.classList.remove('filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
    imgPreview.classList.add('filter-chrome');
  }
});

filterSepia.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-sepia');
});
filterMarvin.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-phobos', 'filter-heat');
  imgPreview.classList.add('filter-marvin');
});
filterPhobos.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-heat');
  imgPreview.classList.add('filter-phobos');
});
filterHeat.addEventListener('click', function (e) {
  imgPreview.classList.remove('filter-chrome', 'filter-sepia', 'filter-phobos', 'filter-marvin');
  imgPreview.classList.add('filter-heat');
});*/


// Изменение масштаба изображения
// При нажатии на кнопки .upload-resize-controls-button-dec
// и .upload-resize-controls-button-inc должно изменяться значение поля
// .upload-resize-controls-value.

// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%,
// после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%.
// Значение по умолчанию — 100%

// При изменении значения поля .upload-resize-controls-value изображению
// .filter-image-preview должен добавляться соответствующий стиль CSS,
// который с помощью трансформации scale задает масштаб. Например,
// если в поле стоит значение 75%, то в стиле изображения должно быть написано
// transform: scale(0.75)

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
