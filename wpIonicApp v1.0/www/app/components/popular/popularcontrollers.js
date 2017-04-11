(function () {
    'use strict';
    var controllerId = 'PopularCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","APIHOST","popularService",
         /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {services} [pagedetailservices] get the popular data from server
         */
          function PopularCtrl($scope,APIHOST,popularService) {
    $scope.moreItems = false;
    $scope.posts = [];
    $scope.images = {};
    
    var popularApi = APIHOST + 'posts' + '?filter[cat]=-21&&filter[orderby]=comment_count';

    $scope.loadPosts = function ()
    {
        popularService.get(popularApi).then(function (response)
        {
            $scope.posts = response.data;
			console.log($scope.posts);
            $scope.moreItems = true;
            
            angular.forEach($scope.posts, function (value, index)
            {
                $scope.itemID = value.id;
                var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
                popularService.get(comments1).then(function (response) {
                    $scope.comment = response.data;
                    value.comment_count = $scope.comment.length;
                })
            })
        })
    }
    $scope.loadPosts();
}
    ]);
})();




