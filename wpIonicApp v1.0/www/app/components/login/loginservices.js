(function () {
    'use strict';
    var serviceId = 'loginService'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function loginService($http, $q, serviceBase, APIHOST) {
                var factory = {};
                factory.login = function (user) {
                    return $http.post(serviceBase + 'wp-json/jwt-auth/v1/token', {
                        username: user.username,
                        password: user.password
                    })
                }
                factory.getUserInfo = function (userId) {
                    return $http.get(APIHOST + 'users/' + userId);
                }
                return factory;
        }]);
})();