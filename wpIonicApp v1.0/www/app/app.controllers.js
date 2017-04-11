wpIonicAppcontrollers.controller('AppCtrl', function ($scope, $rootScope, APIHOST, $ionicLoading, Authentication, $state, $timeout, menuservices)
{
	
	 /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
		 * @param {array} [rootScope] is the top-most scope
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {animation} [ionicLoading] An overlay that can be used to indicate activity while blocking user
interaction
		 * @param {service} [Authentication] service contains methods for authenticating a user
		 * @param {function} [state] used to call stata change
		 * @param {function} [timeout] Angular's wrapper for window.setTimeout
		 * @param {service} [menuservices] are substitutable objects that are wired together using dependency injection (DI)
         *
         */


    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $ionicLoading.show({
            noBackdrop: true
        });
    });

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //return false;
        $timeout(function () {
            $ionicLoading.hide()
        }, 2000);
    });

    $scope.logout = function () {
        Authentication.remove();
        $state.go("login");
    };
    
    var currentuser1 = Authentication.getCurrentUser();
    $rootScope.me = currentuser1
    $scope.name = $rootScope.me.name
    var categoryApi = APIHOST + 'categories?parent=0';

    menuservices.get(categoryApi).then(function (response)
    {

        $scope.category = response.data;
        angular.forEach($scope.category, function (value, index)
        {

            var subcategoryApi = APIHOST + 'categories?parent=' + value.id;
            menuservices.get(subcategoryApi).then(function (response) {
                if (response.data) {
                    value.subcategory = response.data;
                }
            }, function (err) {
                console.log('Error: ', err);
            });
        });
    });
})
wpIonicAppcontrollers.controller('aboutCtrl', function ($scope,$state,$ionicHistory)
{
	/**
	 * Primary entry point for application
	 * @param {array} [scope] The global scope for Angular
	 * @param {function} [state] used to call stata change
	 *
	 */
	 
	$scope.goBack = function() {
      if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        goDefaultBack();
      }
    };
	
	function getDefaultBack() {
		return ($state.current.data || {}).defaultBack;
	}

	function goDefaultBack() {
		$ionicViewSwitcher.nextDirection('back');
		$ionicHistory.nextViewOptions({
		  disableBack: true,
		  historyRoot: true
		});
		$state.go(getDefaultBack().state);
	  }
		 
})