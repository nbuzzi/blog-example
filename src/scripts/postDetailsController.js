'use strict';

const app = angular.module('PostDetails', ['ngSanitize', 'ngQuill']);

app.config(['ngQuillConfigProvider', (ngQuillConfigProvider) => {
    ngQuillConfigProvider.set(null, null, 'custom placeholder')
}]);

app.controller(`PostDetailsController`, ['$scope', '$http', '$sanitize', '$timeout', ($scope, $http, $sanitize, $timeout) => {
    $scope.post = {};
    $scope.currentUser = {};
    $scope.content = '';
    $scope.changeDetected = false;

    $scope.initialize = () => {
        $http.get('/getLoggedUser')
            .then((user) => {
                $scope.currentUser = user.data;

                const params = new URLSearchParams(window.location.search);

                $http.get(`/posts/getById?postId=${params.get('postId')}`)
                    .then((posts) => $scope.post = posts.data)
                    .catch((err) => console.error('Error retrieving the posts.'));
            })
            .catch((err) => window.location.href = '/');
    };

    $scope.addComment = () => {
        const params = new URLSearchParams(window.location.search);

        $http.post('/posts/addComment', {
                postId: params.get('postId'),
                text: $scope.content,
                author: $scope.currentUser.email,
            })
            .then((response) => window.location.reload())
            .catch((error) => console.error(error));
    }

    $scope.initialize();
}]);

app.filter('safe', ($sce) => (val) => $sce.trustAsHtml(val));