(function () {
    'use strict';
    var controllerId = 'VideostabCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","APIHOST","videostabservices","$log","$timeout",
         /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {service} [videosservices] get the video data from server
		 * @param {service} [log] Simple service for logging 
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout
         *
         */
          function VideostabCtrl($scope, APIHOST, videostabservices,$log,$timeout) {
    $scope.set2 = function (ayd) {
        var thumb = getParameterByName(ayd, 'v'),
                url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
        this.thumb = url;
    }
    
    function getParameterByName(url, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    var videosApi = APIHOST + 'posts?filter[category_name]=video'
    videostabservices.get(videosApi).then(function (response)
    {
        
        $scope.posts = response.data;
       $scope.moreItems = true;
    })
	
	var paged = 2;
    $scope.loadMore = function () {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;        
        $log.log('loadMore1 ' + pg);
        $timeout(function () {					  
            videostabservices.get(videosApi + '&page=' + pg).then(function (response) {

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
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
}
    ]);
})();




