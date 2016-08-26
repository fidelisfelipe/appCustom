'use strict';
angular.module('authSocialBackand', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngCookies',
  'ngMessages',
  'ui.utils.masks',
  'LocalForageModule',
  'backand',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, BackandProvider) {

  BackandProvider.setAppName('appcustom');
  BackandProvider.setAnonymousToken('a74e0f4e-94d9-49ee-a13c-2f3f30405d63'); //change prod to setSignUpToken end token

  $httpProvider.interceptors.push('APIInterceptor');

  $urlRouterProvider.otherwise('auth/login');
  // ROUTING with ui.router
  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'auth-social-backand/templates/menu.html',
      controller: 'AuthSocialBackandCtrl as ctrl',
    }).state('auth.home', {
      url: '/home',
      views: {
        'pageContent': {
          templateUrl: 'auth-social-backand/templates/home.view.html',
          controller: 'HomeCtrl as ctrl'
        }
      }
    })
    .state('auth.login', {
      url: '/login',
      views: {
        'pageContent': {
          templateUrl: 'auth-social-backand/templates/login.view.html',
          controller: 'AuthSocialBackandCtrl as ctrl'
        }
      },
    })
    .state('auth.signup', {
      url: '/signup',
      views: {
        'pageContent': {
          templateUrl: 'auth-social-backand/templates/signUp.view.html',
          cache: false,
          controller: 'AuthSocialBackandCtrl as ctrl'
        }
      }
    });

}).run(function ($ionicPlatform, $rootScope, $state, $log, AuthSocialBackandService, Utils, Backand) {

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

  $rootScope.$on('$stateChangeSuccess', AuthSocialBackandService.onChangeSuccess);
  $rootScope.$on('signout', function () {
    $log.log('receiver in auth signout...');
    $state.go('auth.login');
  });
  $rootScope.$on('signin', function () {
    $log.log('receiver in auth signin...');
    $state.go('main.home');
  });

});
