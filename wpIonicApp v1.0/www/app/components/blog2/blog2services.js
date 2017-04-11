(function () {
    'use strict';
    var serviceId = 'blog2services'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function blog2services($http, $q, serviceBase, APIHOST) {

                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

