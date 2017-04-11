(function () {
    'use strict';
    var serviceId = 'recentService'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", function recentService($http, $q, serviceBase, APIHOST) {
                var factory = {};

                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;

        }]);
})();

