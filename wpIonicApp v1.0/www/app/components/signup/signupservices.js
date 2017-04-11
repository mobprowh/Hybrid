(function () {
    'use strict';
    var serviceId = 'signupservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function signupservices($http, $q, serviceBase, APIHOST) {
            var factory = {};
            factory.get = function (user) {
                return $http.get(user)
            }
            return factory;
        }]);
})();

