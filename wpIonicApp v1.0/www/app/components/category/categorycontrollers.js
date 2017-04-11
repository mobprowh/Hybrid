(function () {
    'use strict';
    var controllerId = 'CategoryCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","$stateParams","APIHOST","categoryservices",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [stateParams] object that can store information about a url
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {object} [categoryservices] get the category data from server
         *
         */
          function CategoryCtrl($scope, $stateParams, APIHOST, categoryservices) {
    $scope.posts = [];
    $scope.images = {};
    $scope.itemID = $stateParams.CId;
    var catagoryApi = APIHOST + 'categories/' + $scope.itemID;
    categoryservices.get(catagoryApi).then(function (response)
    {
        $scope.catname = response.data.name;						  	  	   
    })

    var postsApi = APIHOST + 'categories?parent=' + $scope.itemID;
    categoryservices.get(postsApi).then(function (response)
    {
        $scope.subcategory = response.data;
        angular.forEach($scope.subcategory, function (value, index)
        {
            $scope.itemID = value.name;
            var FirstApi = APIHOST + 'posts' + '?filter[category_name]=' + $scope.itemID;
            categoryservices.get(FirstApi).then(function (response) {
                if (response.data) {
                    //console.log('post',response.data);
                    value.firstPost = response.data;
                    //console.log(response.data);																																		
                    $scope.itemID = response.data[0].id;
                    var comments1 = APIHOST + 'comments/' + '?post=' + $scope.itemID;
                    categoryservices.get(comments1).then(function (response)
                    {
                        $scope.comment = response.data;
                        value.firstPost[0].comment_count = $scope.comment.length;
                        console.log('main', $scope.subcategory);

                    })

                }
            })
        })

    })
 }
    ]);
})();