(function () {
    'use strict';
    var controllerId = 'PostdetailCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","$stateParams","APIHOST","$cordovaSocialSharing","postdetailservices","$sce","CacheFactory","$log","$timeout",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [stateParams] object that can store information about a url
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {plugin} [cordovaSocialSharing] plugin required for social sharing
		 * @param {services} [postdetailservices] get the postdetail data from server
		 * @param {service} [sce] is a service that provides Strict Contextual Escaping services to AngularJS. 
		 * @param {object} [CacheFactory] local cache for saving data
		 * @param {service} [log] Simple service for logging
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout		 
         *
         */
          function PostdetailCtrl($scope, $stateParams, APIHOST, $cordovaSocialSharing, postdetailservices, $sce, CacheFactory, $log, $timeout) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });
    $scope.shareAnywhere = function () {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
    }
    $scope.shareViaTwitter = function (message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function (error) {
            alert("Cannot share on Twitter");

        });
    }

    $scope.shareViaWhatsApp = function (message, image, link) {
        $cordovaSocialSharing.shareViaWhatsApp(message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        }, function (error) {
            alert("Cannot share on WhatsApp");
        })
    }


    $scope.shareViaFacebook = function (message, image, link) {
        $cordovaSocialSharing.shareViaFacebook(message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
            // Success!
        }, function (error) {
            alert("Cannot share on Facebook");
            // An error occurred. Show a message to the user
        })
    }



    if (!CacheFactory.get('postCache'))
    {
        CacheFactory.createCache('postCache');
    }
    var postCache = CacheFactory.get('postCache');

    $scope.itemID = $stateParams.postId;
    var singlePostApi = APIHOST + 'posts/' + $scope.itemID;
    var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
    postdetailservices.get(comments1).then(function (response)
    {
        $scope.comments = response.data;
    })


    $scope.loadPost = function ()
    {        
        postdetailservices.get(singlePostApi).then(function (response)
        {
            $scope.post = response.data;
            $log.debug($scope.post);
            $scope.content = $sce.trustAsHtml(response.data.content.rendered);
            postCache.put(response.data.id, response.data);

        },
        function (response)
        {
            $log.error('error', response);

        });
    }

    if (!postCache.get($scope.itemID))
    {
        // Item is not in cache, go get it
        $scope.loadPost();
    } else {
        // Item exists, use cached item
        $scope.post = postCache.get($scope.itemID);
        $scope.content = $scope.post.content.rendered;
    }

    // Pull to refresh
    $scope.doRefresh = function ()
    {
        $timeout(function () {
            $scope.loadPost();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
}
    ]);
})();