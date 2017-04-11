/**
 * Authentication service.
 *
 * @author    Piccosoft {@link http://www.piccosoft.com}
 * @copyright Copyright (c) 2016, Piccosoft Software Services
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngInject
     */
    function AuthenticationProvider() {
        this.$get = function($http, Restangular,$q, Token,APIHOST,serviceBase, localStorageService) {
			
			/**
         * Primary entry point for application
         * @param {service} [http] is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP
         * @param {service } [Restangular] is an AngularJS service which makes GET/POST/PUT/DELETE requests simpler and easier
		 * @param {service } [q] A service that helps you run functions asynchronously
		 * @param {Token} [Token] is used to send information that can be verified and trusted by means of a digital signature
		 * @param {string} [APIHOST] constant for pointing to REST server
		 * @param {string} [serviceBase] constant for pointing to REST server
		 * @param {Service} [localStorageService] Web Storage working in the Angular Way
         *
         */
            var currentUser = null;
            

            return {
                saveUser:function(user){
                    
                    currentUser = user;
                    // save user to locale storage
                    localStorageService.set('user', currentUser);
                    return user;
                },
                saveToken:function(token){
                    
                    Token.set(token);
                    return token;
                },
                createAccessToken:function(user){
                    var token = '';
                    $http.post( serviceBase + 'wp-json/jwt-auth/v1/token', {
                        username: user.username,
                        password: user.password
                    } )
                    .then( function( response ) {
                        console.log(response.data);   
                        token = response.data.token;
                        Token.set(token);
                    } )
                    .catch( function( error ) {
                        console.error( 'Error', error.data[0] );
                    } );

                    return token;
                },
                signup: function(user)
		{
                    console.log('authentication..............:',user);                    
                    
                    //$http.defaults.headers.common['Authorization'] = 'Basic ' + base64;
                    return $http({
                        method: 'POST',
                        //skipAuthorization: true,
                        url: APIHOST+'users',
                        data: "username=" + user.Username +"&password=" + user.password+"&email=" + user.email,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    
                   
                    
                  
		},     
		comment: function(credentials,id,username)
		{
                    console.log(credentials.comment,id,username);                    
                    
                    //$http.defaults.headers.common['Authorization'] = 'Basic ' + base64;
                    return $http({
                        method: 'POST',
                        //skipAuthorization: true,
                        url: APIHOST+'comments?post=' + id,
                        data:"content=" + credentials.comment + "&author_name=" +username,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                                  
                  
		},             
                remove: function() {                       
                    currentUser = null;
                    Token.remove();
                    localStorageService.set('user', currentUser);
                    console.log('dasdfsd');
                    return true;
                },
                isAuthenticated: function() {
                    return !!localStorageService.get('user');
                },
                getCurrentUser: function() {
                    return currentUser || localStorageService.get('user')
                }
            };
        };
    }

    angular
        .module('app.core')
        .provider('Authentication', AuthenticationProvider)
        

})();
