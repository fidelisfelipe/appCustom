'use strict';

angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('auth/login');

  $stateProvider
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
          controller: 'AuthSocialBackandCtrl as ctrl'
        }
      },
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
    }).state('main.search', {
      url: '/search',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/search.html',
          controller: 'SearchCtrl as ctrl',
          show: 'true'
        }
      }
    }).state('main.setting', {
      url: '/setting',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/setting.html',
          controller: 'SettingCtrl as ctrl',
          show: 'true'
        }
      }
    });
}).run(function ($rootScope, $state, $log, Main) {
  $rootScope.$on('$stateChangeSuccess', function () {
    $log.debug('run', $state.current.name);
    if ($state.current.name === 'main.debug') {
      Main.backendOnline();
    }
  });
  Main.menus(function setMenus (menus) {
    $rootScope.menus = menus;
  });

//set state dinamic
});
