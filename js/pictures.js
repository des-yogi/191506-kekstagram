'use strict';

var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

window.pictures = (function () {

  var clickAndKeydownHandler = function (elem) {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      window.showGallery(elem);
    });
    elem.addEventListener('keydown', function (e) {
      if (window.utils.isActivateEvent(e)) {
        window.showGallery(elem);
      }
    });
  };

  function filterSortRandom(picturesArr) {
    var newArr = [];
    var clonePicturesArr = picturesArr.slice();
    var elemToSortAmount = 10;
    for (var i = 0; i < elemToSortAmount; i++) {
      var randomElem = window.utils.getRandomElement(clonePicturesArr);
      var removed = clonePicturesArr.splice(clonePicturesArr.indexOf(randomElem), 1);
      newArr.push(removed[0]);
    }
    return newArr.concat(clonePicturesArr);
  }

  function filterMostCommented(picturesArr) {

    function compareObj(a, b) {
      return b.comments.length - a.comments.length;
    }

    return picturesArr.slice().sort(compareObj);
  }

  return function (e) {
    var picturesContainer = document.querySelector('.pictures');
    var pictures = e.target.response;
    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');
    var filtersBlock = document.querySelector('.filters');

    var renderImages = function (imgArr) {
      if (picturesContainer.innerHTML !== '') {
        while (picturesContainer.firstChild) {
          picturesContainer.removeChild(picturesContainer.firstChild);
        }
      }

      imgArr.forEach(function (item) {
        var newElement = elementToClone.cloneNode(true);
        newElement.tabindex = '0';
        var picture = newElement.querySelector('img');
        var likes = newElement.querySelector('.picture-likes');
        var comments = newElement.querySelector('.picture-comments');
        picture.src = item.url;
        picture.alt = 'Photo from gallery';
        likes.innerText = item.likes;
        comments.innerText = item.comments.length;

        clickAndKeydownHandler(newElement);

        picturesContainer.appendChild(newElement);
      });
    };

    renderImages(pictures);

    filtersBlock.classList.remove('hidden');

    var filtersClickHandler = function () {

      return filtersBlock.addEventListener('click', function (evt) {
        switch (evt.toElement.htmlFor) {
          case ('filter-popular'):
            renderImages(pictures);
            break;
          case ('filter-new'):
            renderImages(filterSortRandom(pictures));
            break;
          case ('filter-discussed'):
            renderImages(filterMostCommented(pictures));
            break;
        }
      });

    };

    filtersClickHandler();

  };

})();

window.load(DATA_URL, window.pictures);
