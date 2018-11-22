(function() {
  angular.module('image-gallery.components.ImageSelector', [])
    .controller('ImageSelectorController', ImageSelectorController)
    .component('imageSelector', {
      templateUrl: 'js/components/ImageSelector.html',
      controller: 'ImageSelectorController',
      bindings: {
        onImageSelect: '&'
      }
    });

  ImageSelectorController.$inject = ['ImageManager'];
  function ImageSelectorController(ImageManager) {
    this.ImageManager = ImageManager;
    this.activeImage = null;
  }

  angular.extend(ImageSelectorController.prototype, {
    selectImage: function selectImage(image) {
      this.activeImage = image;
      this.onImageSelect({ $image: image });
    }
  });
})();
