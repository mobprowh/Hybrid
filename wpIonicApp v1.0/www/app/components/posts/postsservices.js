(function () {
    'use strict';
    var serviceId = 'postsservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function postsservices($http, $q, serviceBase, APIHOST) {
            var factory = {};
            factory.get = function (user) {
                return $http.get(user)
            }
            return factory;
        }]);
})();

