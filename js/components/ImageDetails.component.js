(function() {
  angular.module('image-gallery.components.ImageDetails', [])
    .controller('ImageDetailsController', ImageDetailsController)
    .component('imageDetails', {
      templateUrl: 'js/components/ImageGallery.html',
      controller: 'ImageDetailsController',
      bindings: {
        image: '<'
      }
    });

  ImageDetailsController.$inject = ['$http'];
  function ImageDetailsController($http) {
    this.$http = $http;
    this.image = null;
    this.pendingComment = '';
  }

  ImageDetailsController.prototype.submit = function submit(comment) {
    return this.$http.post('/images/123/comments', { comment: this.pendingComment })
      .then(function(res) {
        this.image.comments.push(res.comment);
        this.clearPending();
      });
  };
  
  ImageDetailsController.prototype.clearPending = function clearPending() {
    this.pendingComment = '';
  };
})();
