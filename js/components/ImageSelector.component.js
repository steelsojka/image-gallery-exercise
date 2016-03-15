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

  ImageSelectorController.$inject = [];
  function ImageSelectorController() {
    this.activeImage = null;
  }

  angular.extend(ImageSelectorController.prototype, {
    selectImage: function selectImage(image) {
      this.activeImage = image;
      this.onImageSelect({ $image: image });
    }
  });
})();
