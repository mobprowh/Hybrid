(function () {
    'use strict';
    var serviceId = 'blog1services'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function blog1services($http, $q, serviceBase, APIHOST) {
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }              
                return factory;
        }]);
})();

