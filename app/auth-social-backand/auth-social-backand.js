'use strict';
var $stateProviderRef = null;
angular.module('authSocialBackand', [
  'ngCookies',
  'ngMessages',
  'ui.utils.masks',
  'LocalForageModule',
  'backand',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, BackandProvider) {

  BackandProvider.setAppName('appcustom');
  BackandProvider.setSignUpToken('f62f5306-741b-4d82-9bc1-5917704dc9a6');

  $httpProvider.interceptors.push('APIInterceptor');

  $urlRouterProvider.otherwise('/auth/social/backand/login');
  // ROUTING with ui.router
  $stateProviderRef = $stateProvider;
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('authSocialBackandHome', {
      url: '/auth/social/backand/home',
      templateUrl: 'auth-social-backand/templates/home.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandLogin', {
      url: '/auth/social/backand/login',
      templateUrl: 'auth-social-backand/templates/login.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandSignUp', {
      url: '/auth/social/backand/sigup',
      templateUrl: 'auth-social-backand/templates/signUp.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandUpdateAccount', {
      url: '/auth/social/backand/update/account',
      views: {
        'pageContent': {
          templateUrl: 'auth-social-backand/templates/login.view.html',
          controller: 'AuthSocialBackandCtrl as vm',
        }
      },
      cache: false
    });

}).run(function ($ionicPlatform, $rootScope, $state, $log, AuthSocialBackandService, Backand) {

  $ionicPlatform.ready(function () {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      window.cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
    // org.apache.cordova.statusbar required
      window.StatusBar.styleLightContent();
    }

    var isMobile = !(ionic.Platform.platforms[0] === 'browser');
    Backand.setIsMobile(isMobile);
    Backand.setRunSignupAfterErrorInSigninSocial(true);
  });

  $rootScope.menus = AuthSocialBackandService.menus(function setMenus (menus) {$log.log('response menus auth: ', menus);});
//set state dinamic
  angular.forEach($rootScope.menus, function (value) {
    $log.log('Menu.name: ', value.name);
    var state = {
      'url': value.url,
      'views': {}
    };

    angular.forEach(value.views, function (view)
    {
      state.views[view.name] = {
        templateUrl: view.templateUrl,
        controller: view.controller,
      };
    });
    $stateProviderRef.state(value.name, state);
  });
//set state dinamic

  $rootScope.$on('$stateChangeSuccess', AuthSocialBackandService.onChangeSuccess);


});
