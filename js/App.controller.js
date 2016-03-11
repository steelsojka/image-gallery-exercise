(function() {
  angular.module('image-gallery.App', [])
    .controller('AppController', AppController);

  function AppController() {
    this.activeImage = null;
  }

  AppController.prototype.onImageSelect = function onImageSelect(image) {
    this.activeImage = image;
  };
})();
