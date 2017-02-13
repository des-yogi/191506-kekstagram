'use strict';

/*
Модуль, экспортирующий в глобальную область видимости функцию
createScale создающую виджет, управляющий масштабом.
Функция должна принимать на вход элемент, который будет управлять
масштабом изображения, шаг, с которым будет происходить изменение
и изначальное значение.
*/

window.createScale = (function () {
  return function (element, step, initialScale, cb, sizeOutputField) {
    element.addEventListener('click', function (e) {
      if (e.target.classList.contains('upload-resize-controls-button-inc') && initialScale < 100) {
        initialScale = initialScale + step;
        sizeOutputField.value = initialScale + '%';
        cb(initialScale);
        // imgPreview.style.transform = 'scale(' + initialScale / 100 + ')';
      }
      if (e.target.classList.contains('upload-resize-controls-button-dec') && initialScale > 25) {
        initialScale = initialScale - step;
        sizeOutputField.value = initialScale + '%';
        cb(initialScale);
        // imgPreview.style.transform = 'scale(' + initialScale / 100 + ')';
      }
    });
  };
})();

/* window.createScale = function (element, step, initialScale, imgPreview, sizeOutputField) {
  element.addEventListener('click', function (e) {
    if (e.target.classList.contains('upload-resize-controls-button-inc') && initialScale < 100) {
      initialScale = initialScale + step;
      imgPreview.style.transform = 'scale(' + initialScale / 100 + ')';
      sizeOutputField.value = initialScale + '%';
    }
    if (e.target.classList.contains('upload-resize-controls-button-dec') && initialScale > 25) {
      initialScale = initialScale - step;
      imgPreview.style.transform = 'scale(' + initialScale / 100 + ')';
      sizeOutputField.value = initialScale + '%';
    }
  });
};
*/
