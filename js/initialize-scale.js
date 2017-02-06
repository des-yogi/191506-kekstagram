'use strict';

/*
Модуль, экспортирующий в глобальную область видимости функцию
createScale создающую виджет, управляющий масштабом.
Функция должна принимать на вход элемент, который будет управлять
масштабом изображения, шаг, с которым будет происходить изменение
и изначальное значение.
*/

var sizeOutputField = document.querySelector('.upload-resize-controls-value');

window.createScale = function (element, step, initialScale, imgPreview) {
  element.addEventListener('click', function (e) {
    if (e.target.className === 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-inc' && parseInt(initialScale, 10) < 100) {
      initialScale = parseInt(initialScale, 10) + parseInt(step, 10) + '%';
      imgPreview.style.transform = 'scale(' + parseInt(initialScale, 10) / 100 + ')';
      sizeOutputField.value = initialScale;
    }
    if (e.target.className === 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-dec' && parseInt(initialScale, 10) > 25) {
      initialScale = parseInt(initialScale, 10) - parseInt(step, 10) + '%';
      imgPreview.style.transform = 'scale(' + parseInt(initialScale, 10) / 100 + ')';
      sizeOutputField.value = initialScale;
    }
  });
};
