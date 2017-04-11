(function () {
    'use strict';
    var serviceId = 'postdetailservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function postdetailservices($http, $q, serviceBase, APIHOST) {
                
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

