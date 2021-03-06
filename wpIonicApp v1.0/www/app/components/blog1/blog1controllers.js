(function () {
    'use strict';
    var controllerId = 'Blog1Ctrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","$stateParams","APIHOST","blog1services","$log","$timeout",

        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [stateParams] object that can store information about a url
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {service} [blog1services] get the blog data from server
		 * @param {service} [log] Simple service for logging
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout
         *
         */
          function Blog1Ctrl($scope, $stateParams, APIHOST, blog1services, $log, $timeout) {

    $scope.identity = angular.identity;
    $scope.posts = [];
    $scope.images = {};

    $scope.itemID = $stateParams.CName;
    var PostpageApi = APIHOST + 'posts' + '?filter[category_name]=' + 'Blog';
    blog1services.get(PostpageApi).then(function (response)
    {
        $scope.posts = response.data;
        $scope.moreItems = true;
        angular.forEach($scope.posts, function (value, index)
        {
            $scope.itemID = value.id;
            var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
            blog1services.get(comments1).then(function (response) {
                $scope.comment = response.data;
                value.comment_count = $scope.comment.length;
            })
        })
    })
   var paged = 2;
    // Load more (infinite scroll)
    $scope.loadMore = function () {

        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        $log.log('loadMore1 ' + pg);
        $timeout(function () {					  
            blog1services.get(PostpageApi + '&page=' + pg).then(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.posts.push(value);

                });

                angular.forEach($scope.posts, function (value, index)
                {
                    $scope.itemID = value.id;
                    var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
                    blog1services.get(comments1).then(function (response) {
                        $scope.comment = response.data;
                        value.comment_count = $scope.comment.length;
                    })
                })
                if (response.data.length <= 0) {
                    $scope.moreItems = false;
                }
            }, function (response) {
                $scope.moreItems = false;
                $log.error(response);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);

    }

    $scope.moreDataExists = function () {
        return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function () {
        $timeout(function () {
            $scope.loadPosts();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
 }
    ]);
})();