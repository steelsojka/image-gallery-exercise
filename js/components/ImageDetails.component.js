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

  angular.extend(ImageDetailsController.prototype, {
    submit: function submit() {
      // Using a fake post here... normally 'post' would be used.
      return this.$http.fakePost('/images/123/comments', { comment: this.pendingComment })
        .then(this.onCommentSuccess.bind(this));
    },
    clearPending: function clearPending() {
      this.pendingComment = '';
    },
    onCommentSuccess: function onSuccess(res) {
      this.image.comments.push(res.comment);
      this.clearPending();
    }
  });
})();
