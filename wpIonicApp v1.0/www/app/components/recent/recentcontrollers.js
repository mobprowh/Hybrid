(function () {
    'use strict';
    var controllerId = 'RecentCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","APIHOST","recentService",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {Service} [recentService] get the recent data from server
         *
         */
          function RecentCtrl($scope, APIHOST, recentService, CacheFactory, $ionicLoading, $log, $timeout) {
    var blogApi = APIHOST + 'posts?filter[cat]=-blog&&filter[posts_per_page]=5';

    recentService.get(blogApi).then(function (response)
    {
		$scope.posts = response.data;

    })
}
    ]);
})();