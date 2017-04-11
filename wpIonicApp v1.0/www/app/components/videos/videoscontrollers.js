(function () {
    'use strict';
    var controllerId = 'VideosCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope", "APIHOST", "videosservices","$log","$timeout",
         /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {service} [videos1services] get the video1 data from server
		 * @param {function} [log] Simple service for logging
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout
         *
         */
          function VideosCtrl($scope, APIHOST, videosservices,$log,$timeout) {
    $scope.set2 = function (ayd) {
        var ayd1 = 'https://www.youtube.com/watch?v=' + ayd;
        var thumb = getParameterByName(ayd1, 'v'),
                url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
        return this.thumb = url
    }

    function getParameterByName(url, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    var videosApi = APIHOST + 'posts?filter[category_name]=video'

    videosservices.get(videosApi).then(function (response)
    {
        $scope.posts = response.data;
		$scope.moreItems = true;
		angular.forEach($scope.posts, function (value, index)
        {
            $scope.itemID = value.id;
            var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
            videosservices.get(comments1).then(function (response) {
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
            videosservices.get(videosApi + '&page=' + pg).then(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.posts.push(value);

                });
				angular.forEach($scope.posts, function (value, index)
        {
            $scope.itemID = value.id;
            var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
            videosservices.get(comments1).then(function (response) {
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
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
}
    ]);
})();