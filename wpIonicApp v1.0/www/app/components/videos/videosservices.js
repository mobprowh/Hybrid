(function () {
    'use strict';
    var serviceId = 'videosservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function videosservices($http, $q, serviceBase, APIHOST) {
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }
                return factory;
        }]);
})();

