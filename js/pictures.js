'use strict';

var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

window.pictures = (function () {

    var clickAndKeydownHandler = function (elem) {
      elem.addEventListener('click', function (e) {
        e.preventDefault();
        window.showGallery(elem);
      });
    };

  return function (e) {
    var picturesContainer = document.querySelector('.pictures');
    var pictures = e.target.response;
    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');

    pictures.forEach(function (item) {
      var newElement = elementToClone.cloneNode(true);
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

})();

window.load(DATA_URL, window.pictures);

