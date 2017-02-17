'use strict';

window.showGallery = (function () {

  return function () {

    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    galleryOverlay.classList.remove('invisible');
    galleryOverlayClose.focus();

    var closeOverlayHandler = function (e) {
      galleryOverlay.classList.add('invisible');
      e.target.setAttribute('aria-pressed', 'true');
    };

    galleryOverlayClose.addEventListener('click', function (e) {
      closeOverlayHandler(e);
    });

    galleryOverlayClose.addEventListener('keydown', function (e) {
      if (window.utils.isActivateEvent(e)) {
        closeOverlayHandler(e);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (window.utils.isDeactivateEvent(e)) {
        closeOverlayHandler(e);
      }
    });

  };

})();
