'use strict';

window.showGallery = (function () {

  return function (elem) {

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

    var galleryImage = galleryOverlay.querySelector('.gallery-overlay-image');
    var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
    var galleryCommentsCount = galleryOverlay.querySelector('.comments-count');
    galleryImage.src = elem.firstElementChild.currentSrc;
    galleryLikesCount.innerHTML = elem.innerText.replace(/^\d+/g, '');
    galleryCommentsCount.innerHTML = elem.innerText.replace(/\d+$/g, '');
  };

})();
