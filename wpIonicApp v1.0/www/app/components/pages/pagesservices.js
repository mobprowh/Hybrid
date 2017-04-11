(function () {
    'use strict';
    var serviceId = 'pagesservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function pagesservices($http, $q, serviceBase, APIHOST) {
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

