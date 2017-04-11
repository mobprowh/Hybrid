(function () {
    'use strict';
    var serviceId = 'videostabservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", function videostabservices($http, $q, serviceBase, APIHOST) {
            var factory = {};

            factory.get = function (user) {
                return $http.get(user)
            }
            return factory;
        }]);
})();

