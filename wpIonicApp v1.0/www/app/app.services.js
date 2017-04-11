(function () {
    'use strict';
    var serviceId = 'menuservices'
    wpIonicApp.service(serviceId,
            ['$http', '$q', "serviceBase", "APIHOST", 
            function menuservices($http, $q, serviceBase, APIHOST) {
                
                var factory = {};
                factory.get = function (user) {
                    return $http.get(user)
                }

                factory.getUserInfo = function (userId) {
                    console.log('Enter servi login');
                    return $http.get(APIHOST + 'users/' + userId);
                }
                return factory;
        }]);
})();

