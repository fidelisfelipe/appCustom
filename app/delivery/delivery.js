'use strict';
angular.module('delivery', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ionic-material',
  'sir-accordion',
  'ionicLazyLoad',
  'ionicShop',
  'ngMessages',
  'ngStorage',
  'ngSanitize',

  'ionic-datepicker',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center'); // Align title center

  $urlRouterProvider.otherwise('/delivery/home');
  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('delivery', {
      url: '/delivery',
      abstract: true,
      templateUrl: 'delivery/templates/menu.html',
      // controller: 'SomeCtrl as ctrl'
    }).state('delivery.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/home.html',
          controller: 'ConnectionCtrl'
        }
      }
    });
}).run(function ($ionicPlatform, $rootScope, $ionicPopup, $cordovaToast, $cordovaInAppBrowser) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
