(function() {
  angular.module('image-gallery.components.ImageSelector', [])
    .controller('ImageSelectorController', ImageSelectorController)
    .component('imageSelector', {
      templateUrl: 'js/components/ImageSelect.html',
      controller: 'ImageSelectorController',
      bindings: {
        onImageSelect: '&'
      }
    });

  function ImageSelectorController() {
    this.activeImage = null;
  }

  ImageSelectorController.prototype.selectImage = function selectImage(image) {
    this.activeImage = image;
    this.onImageSelect({ $image: image });
  };
})();
