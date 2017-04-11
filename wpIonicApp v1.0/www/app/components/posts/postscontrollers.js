(function () {
    'use strict';
    var controllerId = 'PostsCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","postsservices","APIHOST","$stateParams","$log","$timeout",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
		 * @param {service} [postsservices] get the posts data from server
         * @param {object} [APIHOST] constant for pointing to REST server
		 * @param {object} [stateParams] object that can store information about a url
		 * @param {service} [log] Simple service for logging
		 * @param {object} [timeout] Angular's wrapper for window.setTimeout
		 
         */
          function PostsCtrl($scope, postsservices, APIHOST, $stateParams, $log, $timeout) {
    $scope.moreItems = false;
    $scope.posts = [];
    $scope.images = {};
    $scope.itemID = $stateParams.CName;
    var NewslistApi = APIHOST + 'posts' + '?filter[category_name]=' + $scope.itemID;
    $scope.loadPosts = function ()
    {
        postsservices.get(NewslistApi).then(function (response)
        {
            $scope.posts = response.data;
            $scope.moreItems = true;
        })
    }

    $scope.loadPosts();
   var paged = 2;

    // Load more (infinite scroll)
    $scope.loadMore = function () {
        if (!$scope.moreItems) {
            return;
        }

        var pg = paged++;
        $log.log('loadMore1 ' + pg);

        $timeout(function () {						  
            postsservices.get(NewslistApi + '&page=' + pg).then(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.posts.push(value);

                });

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