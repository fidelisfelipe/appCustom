'use strict';

angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('main/home');

  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'AuthSocialBackandCtrl as ctrl',
    }).state('main.home', {
      url: '/home',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/home.html',
          show: 'true'
        }
      }
    }).state('main.account', {
      url: '/account',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/account.html',
          controller: 'AuthSocialBackandCtrl as ctrl',
          show: 'true'
        }
      }
    }).state('main.about', {
      url: '/about',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/about.html',
          show: 'true'
        }
      }
    }).state('main.debug', {
      url: '/debug',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/debug.html',
          controller: 'DebugCtrl as ctrl',
          show: 'true'
        }
      }
    }).state('main.link', {
      url: '/link',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/link.html',
          controller: 'LinkCtrl as ctrl',
          show: 'true'
        }
      }
    });
}).run(function ($rootScope, $state, $log, Main) {
  $log.log('init module main');
  $rootScope.$on('$stateChangeSuccess', function () {$log.log($state.current.name === 'main.debug'); if ($state.current.name === 'main.debug') {Main.backendOnline();}});
  $rootScope.title = 'App Custom';
  Main.menus(function setMenus (menus) {
    $log.log('menus main: ', menus);
    $rootScope.menus = menus;
  });

//set state dinamic
});
