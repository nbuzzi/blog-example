'use strict';

const app = angular.module('PostDetails', ['ngSanitize']);

app.controller(`PostDetailsController`, ['$scope', '$http', '$sanitize', ($scope, $http, $sanitize) => {
    $scope.post = {};
    $scope.currentUser = {};

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

    $scope.initialize();
}]);

app.filter('safe', ($sce) => (val) => $sce.trustAsHtml(val));