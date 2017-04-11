(function () {
    'use strict';
    var serviceId = 'categoryservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function categoryservices($http, $q, serviceBase, APIHOST) {

                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

