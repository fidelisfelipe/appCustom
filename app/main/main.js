'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/home');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as ctrl'
    })
     .state('main.account', {
       url: '/account',
       views: {
         'pageContent': {
           templateUrl: 'main/templates/account.html',
           controller: 'AccountCtrl as ctrl'
         }
       }
     })
     .state('main.facebook', {
       url: '/facebook',
       views: {
         'pageContent': {
           templateUrl: 'main/templates/facebook.html',
           controller: 'FacebookCtrl as ctrl'
         }
       }
     })
     .state('main.home', {
       url: '/home',
       views: {
         'pageContent': {
           templateUrl: 'main/templates/home.html',
           controller: 'HomeCtrl as ctrl'
         }
       }
     })
     .state('main.about', {
       url: '/about',
       views: {
         'pageContent': {
           templateUrl: 'main/templates/about.html'
         }
       }
     })
     .state('main.inscription', {
       url: '/inscription',
       views: {
         'pageContent': {
           templateUrl: 'main/templates/inscription.html'
         }
       }
     })
      .state('main.regulation', {
        url: '/regulation',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/regulation.html'
          }
        }
      })
      .state('main.ranking', {
        url: '/ranking',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/ranking.html'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
}).run(function ($rootScope, $state, $log, Main) {
  $rootScope.$on('$stateChangeSuccess', function () {$log.log($state.current.name === 'main.debug'); if ($state.current.name === 'main.debug') {Main.backendOnline();}});
});
