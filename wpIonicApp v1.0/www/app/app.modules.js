// Ionic wpIonicApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'wpIonicApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'wpIonicApp.controllers' is found in controllers.js, wpIoinc.services is in services.js
var wpIonicApp = angular.module('wpIonicApp', ['ionic', 'ionic.service.core', 'wpIonicApp.controllers', 'ui.router',
    'ionic',
    'restangular',
    'LocalStorageModule',
    'ngCordova',
    'app.core', 'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'angularMoment',
    'angular-cache', 'wpIonicApp.filters'])

var wpIonicAppcontrollers = angular.module('wpIonicApp.controllers', [])

var wpIonicAppservices = angular.module('wpIonicApp.services', [])

wpIonicApp.run(function ($ionicPlatform, $state, Authentication, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                    title: "Internet Disconnected",
                    content: "The internet is disconnected on your device."
                })
                .then(function (result) {
                    if (!result) {
                        ionic.Platform.exitApp();
                    } else {
                        ionic.Platform.exitApp();
                    }
                });
            }
        }


        var currentuser = Authentication.getCurrentUser();
        $rootScope.me = currentuser
        //console.log(currentuser.username);
        if (!Authentication.isAuthenticated()) {
            $state.go('login')
        } else {
            $state.go('app.tabs.recent')
        }


        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var element;
            console.log('tostate', toState);
            console.log(Authentication.getCurrentUser());
            if (toState.data.authenticate && !Authentication.isAuthenticated()) {
                console.log('No authorized!');
                event.preventDefault();
                $state.go('login')
            }
        })

        $rootScope.$on('$routeChangeStart', function (event, next)
        {
            console.log(Authentication.isAuthenticated());
            if (!Authentication.isAuthenticated()) {
                event.preventDefault();
                $state.go('login')
            }
        })

    })
})

// set our API host

wpIonicApp.constant('APIHOST', 'http://www.YOURWORDPRESSDOMAIN.com/wp-json/wp/v2/')

wpIonicApp.constant('serviceBase', 'http://www.YOURWORDPRESSDOMAIN.com/')

wpIonicApp.constant('Admin',{username:'YOURWORDPRESS ADMIN USERNAME',password:'YOURWORDPRESS ADMIN PASSWORD'});



wpIonicApp.directive('addASpaceBetween', [function () {
        'use strict';
        return function (scope, element) {
            if (!scope.$last) {
                element.after('&#32;');
            }
        }
    }
])