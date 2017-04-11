(function () {
    'use strict';
    var controllerId = 'LoginCtrl';	

    wpIonicAppcontrollers.controller(controllerId, ["$state","Authentication","Token","loginService","$rootScope","$ionicLoading",
        /**
         * Primary entry point for application
         * @param [state] describes what the UI looks like and does at that place
         * @param {service} [Authentication] service contains methods for authenticating a user
		 * @param {token} [Token] is used to send information that can be verified and trusted by means of a digital signature
		 * @param {Service} [loginService] get user information from server
		 * @param {array} [rootScope] is the top-most scope
         *
         */
          function LoginCtrl($state,Authentication, Token, loginService, $rootScope,$ionicLoading) {
    var mmv = this;

    mmv.logout = function () {
        Authentication.remove();
        $state.go("login");
    };

    $rootScope.me = Authentication.getCurrentUser();

    mmv.signIn = function (credentials) {
        $ionicLoading.show({
            noBackdrop: true
        });
        loginService.login(credentials).then(function (res)
        {
            var token = res.data.token;
            var decodetoken = Token.decodeToken(token);
            var decodetoken1 = JSON.parse(decodetoken);
            Authentication.saveToken(token);

            var userId = decodetoken1.data.user.id;

            loginService.getUserInfo(userId).then(function (result)
            {
			    $ionicLoading.hide();
                var currentuser = result.data;
                $rootScope.me = currentuser
                Authentication.saveUser(currentuser);
                $state.go('app.tabs.recent')
            });
        },
        function (error) {
            $ionicLoading.hide();
            if (error.status == '403') {
                mmv.error = 'Authentication failed';
            }

        }

        )
    }
	 }
    ]);
})();
