(function () {
    'use strict';
    var controllerId = 'SignupCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$scope","Authentication","$state","$timeout","signupservices","$rootScope","$ionicLoading","Admin",
        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {service} [Authentication] service contains methods for authenticating a user
         * @param [state] describes what the UI looks like and does at that place
         * @param {function} [timeout] Angular's wrapper for window.setTimeout
         * @param {service} [signupservices] access signup service to REST server
		 * @param {array} [rootScope] is the top-most scope
         *
         */
          function SignupCtrl($scope, Authentication, $state, $timeout,signupservices, $rootScope, $ionicLoading,Admin) {
			  var sc=this;
    Authentication.remove();
    var data = {
        username: Admin.username,
        password: Admin.password
    };
    // use our Base64 service to encode the user/pass

    Authentication.createAccessToken(data);

    sc.signUp = function (credentials, isValid)
    {
        $ionicLoading.show({
            noBackdrop: true
        });

        Authentication.signup(credentials).then(function (res)
        {
            Authentication.saveUser(res.data);
            $rootScope.me = Authentication.getCurrentUser();
            $state.go('app.tabs.recent', {userId: $rootScope.me.member_id});
            $ionicLoading.hide();
        }, function (error) {
            //$cordovaVibration.vibrate(100);
            $scope.error = error.data.message;
			sc.error=$scope.error;
			console.log(error.data.message);
            $ionicLoading.hide();
        });
    }
}
    ]);
})();





