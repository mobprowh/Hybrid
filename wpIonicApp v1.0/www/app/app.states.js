/**
 * Load states for application
 * more info on UI-Router states can be found at
 * https://github.com/angular-ui/ui-router/wiki
 */
wpIonicApp.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','CacheFactoryProvider',function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, CacheFactoryProvider) {

    angular.extend(CacheFactoryProvider.defaults, {
        'storageMode': 'localStorage',
        'capacity': 10,
        'maxAge': 10800000,
        'deleteOnExpire': 'aggressive',
        'recycleFreq': 10000
    })

    // Native scrolling
    if (ionic.Platform.isAndroid()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }

    $stateProvider

        // sets up our default state, all views are loaded through here
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/shared/menu.html",
            controller: 'AppCtrl',
            data: {
                authenticate: true
            },
        })

        .state('login', {
            url: "/login",
            cache: false,
            templateUrl: "app/components/login/login.html",
            controller: 'LoginCtrl as mmv',
            data: {
                authenticate: false
            }

        })
		
        .state('signup', {
            url: "/signup",
            cache: false,
            templateUrl: "app/components/signup/signup.html",
            controller: 'SignupCtrl as sc',
            data: {
                authenticate: false
            }

        })

        .state('app.tabs', {
            url: "/tabs",
            views: {
                'menuContent': {
                    templateUrl: "app/components/tabs/tabs.html",
                    data: {
                        authenticate: true
                    }

                }
            }
        })

        .state('app.tabs.recent', {
            url: "/recent",
            views: {
                'recentTab': {
                    templateUrl: "app/components/recent/recent.html",
                    controller: 'RecentCtrl'
                }
            },
            data: {
                authenticate: true
            }


        })

        .state('app.tabs.popular', {
            url: "/popular",
            views: {
                'popularTab': {
                    templateUrl: "app/components/popular/popular.html",
                    controller: 'PopularCtrl'
                }
            },
            data: {
                authenticate: true
            }


        })


        .state('app.tabs.videostab', {
            url: "/videostab",
            cache: false,
            views: {
                'videoTab': {
                    templateUrl: "app/components/videostab/videostab.html",
                    controller: 'VideostabCtrl'
                }
            },
            data: {
                authenticate: true
            }


        })


        .state('app.videos', {
            url: "/videos",
            views: {
                'menuContent': {
                    templateUrl: "app/components/videos/videos.html",
                    controller: 'VideosCtrl'
                }
            },
            data: {
                authenticate: true
            }


        })

		
        .state('app.blog1', {
            url: "/blog1",
            views: {
                'menuContent': {
                    templateUrl: "app/components/blog1/blog1.html",
                    controller: 'Blog1Ctrl',
                    data: {
                        authenticate: true
                    }

                }
            }
        })

        .state('app.blog2', {
            url: "/blog2",
            views: {
                'menuContent': {
                    templateUrl: "app/components/blog2/blog2.html",
                    controller: 'Blog2Ctrl',
                    data: {
                        authenticate: true
                    }

                }
            }
        })



        .state('app.pages', {
            url: "/pages",
            views: {
                'menuContent': {
                    templateUrl: "app/components/pages/pages.html",
                    controller: 'PagesCtrl',
                    data: {
                        authenticate: true
                    }

                }
            }
        })

        


        .state('app.posts', {
            url: "/posts/:CName",
            views: {
                'menuContent': {
                    templateUrl: "app/components/posts/posts.html",
                    controller: 'PostsCtrl',
                    data: {
                        authenticate: true
                    }
                }
            }
        })

        .state('app.postdetail', {
            url: "/postdetail/:postId",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "app/components/postdetail/postdetail.html",
                    controller: 'PostdetailCtrl',
                    data: {
                        authenticate: true
                    }
                }
            }
        })

        .state('app.pagedetail', {
            url: "/pagedetail/:postId",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "app/components/pagedetail/pagedetail.html",
                    controller: 'pagedetailCtrl',
                    data: {
                        authenticate: true
                    }
                }
            }
        })

        .state('app.category', {
            url: "/category/:CId",
            views: {
                'menuContent': {
                    templateUrl: "app/components/category/category.html",
                    controller: 'CategoryCtrl',
                    data: {
                        authenticate: true
                    }
                }
            }
        })
}])