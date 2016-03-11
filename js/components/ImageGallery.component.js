(function() {
  angular.module('image-gallery.components.ImageGallery', [
    'image-gallery.components.ImageDetails',
    'image-gallery.components.ImageSelector'
  ])
    .controller('ImageGalleryController', ImageGalleryController)
    .component('imageGallery', {
      templateUrl: 'js/components/ImageGallery.html',
      controller: 'ImageGalleryController'
    });

  function ImageGalleryController() {
    this.activeImage = null;
  }

  ImageGalleryController.prototype.onImageSelect = function onImageSelect(image) {
    this.activeImage = image;
  };
})();
