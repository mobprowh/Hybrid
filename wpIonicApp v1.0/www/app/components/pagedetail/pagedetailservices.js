(function () {
    'use strict';
    var serviceId = 'pagedetailservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function pagedetailservices($http, $q, serviceBase, APIHOST) {

                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;

        }]);
})();

