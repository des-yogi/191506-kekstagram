'use strict';

window.createScale = (function () {
  return function (element, step, initialScale, scaleCallBack) {
    element.addEventListener('click', function (e) {
      if (e.target.classList.contains('upload-resize-controls-button-inc') && initialScale < 100) {
        initialScale = initialScale + step;
        element.children[1].value = initialScale + '%';
      }
      if (e.target.classList.contains('upload-resize-controls-button-dec') && initialScale > 25) {
        initialScale = initialScale - step;
        element.children[1].value = initialScale + '%';
      }
      if (typeof scaleCallBack === 'function') {
        scaleCallBack(initialScale);
      }
    });
  };
})();
