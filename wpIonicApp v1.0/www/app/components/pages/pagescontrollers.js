(function () {
    'use strict';
    var controllerId = 'PagesCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope", "$stateParams", "APIHOST", "pagesservices", "$log", "$timeout",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [stateParams] object that can store information about a url
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {service} [pagedetailservices] get the pagedetail data from server
		 * @param {service} [log] Simple service for logging
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout	 
         *
         */
          function PagesCtrl($scope, $stateParams, APIHOST, pagesservices, $log, $timeout) {
    $scope.identity = angular.identity;
    $scope.posts = [];
    $scope.images = {};

    $scope.itemID = $stateParams.CName;
    var PostpageApi = APIHOST + 'pages';

    pagesservices.get(PostpageApi).then(function (response)
    {
        $scope.posts = response.data;
        $scope.moreItems = true;
        angular.forEach($scope.posts, function (value, index)
        {
            $scope.itemID = value.id;
            var comments1 = APIHOST + 'comments/' + '?page=' + $scope.itemID;
            pagesservices.get(comments1).then(function (response) {
                $scope.comment = response.data;
                value.comment_count = $scope.comment.length;
            })
        })
    })
    var paged = 2;
    $scope.loadMore = function () {
        if (!$scope.moreItems) {
            return;
        }

        var pg = paged++;

        $log.log('loadMore1 ' + pg);

        $timeout(function () {				  
            pagesservices.get(PostpageApi + '&page=' + pg).then(function (response) {
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