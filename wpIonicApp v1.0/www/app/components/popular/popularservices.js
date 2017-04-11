(function () {
    'use strict';
    var serviceId = 'popularService'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", function popularService($http, $q, serviceBase, APIHOST) {
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

