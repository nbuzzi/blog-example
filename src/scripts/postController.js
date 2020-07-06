'use strict';

const app = angular.module('Posts', ['ngSanitize', 'ngQuill']);

app.config(['ngQuillConfigProvider', (ngQuillConfigProvider) => {
    ngQuillConfigProvider.set(null, null, 'custom placeholder')
}]);

app.controller(`PostController`, ['$scope', '$http', '$sanitize', '$timeout', ($scope, $http, $sanitize, $timeout) => {
    $scope.posts = [];
    $scope.currentUser = {};
    $scope.content = '';
    $scope.title = '';
    $scope.previewUrl = '';
    $scope.changeDetected = false;

    $scope.initialize = () => {
        $http.get('/getLoggedUser')
            .then((user) => {
                $scope.currentUser = user.data;

                $http.get('/posts/get').then((posts) => {
                    $scope.posts = posts.data;
                }).catch((err) => console.log('Error retrieving the posts.'));
            })
            .catch((err) => window.location.href = '/');
    };

    $scope.openPost = (postId) => {
        window.location.href = `/posts/view?postId=${postId}`;
    };

    $scope.createPost = () => {
        $http.post('/posts/create', {
            name: $scope.title,
            content: $scope.content,
            previewImageUrl: $scope.previewUrl,
            author: $scope.currentUser.email,
        }).then((response) => {
            console.log(response);

            window.location.href = '/posts';
        }).catch((error) => {
            console.error(error);
        });
    };

    $scope.canDeletePost = (post) =>
        $scope.currentUser && $scope.currentUser.isAdmin || post.author && post.author.toLowerCase() === 'Guest';

    $scope.deletePost = (postId) => {
        $http.delete(`/posts/delete?postId=${postId}`)
            .then((response) => {
                $scope.posts = $scope.posts.filter((m) => m.id !== postId);

                Swal.fire({
                    title: 'Success',
                    text: `The post was successfully deleted.`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: `Something went wrong, please try again later.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    $scope.editorCreated = (editor) => {
        console.log(editor);
    }

    $scope.contentChanged = (editor, html, text, content, delta, oldDelta, source) => {
        console.log('editor: ', editor, 'html: ', html, 'text:', text, 'content:', content, 'delta: ', delta, 'oldDelta:', oldDelta, 'source:', source);
    }

    $scope.selectionChanged = (editor, range, oldRange, source) => {
        console.log('editor: ', editor, 'range: ', range, 'oldRange:', oldRange, 'source:', source);
    }

    $scope.onFocus = (editor, source) => {
        console.log('focus: ', editor, 'source:', source);
    }

    $scope.onBlur = (editor, source) => {
        console.log('blur: ', editor, 'source:', source);
    }

    $scope.initialize();
}]);

app.filter('safe', ($sce) => (val) => $sce.trustAsHtml(val));