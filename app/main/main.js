'use strict';

angular.module('main', [
  'ionic',
  'starter.controllers',
  'starter.directives',
  'starter.services',
  'ionic-material',
  'sir-accordion',
  'ionicLazyLoad',
  'ionicShop',
  'ngMessages',
  'ngStorage',
  'ngSanitize'
  // TODO: load other modules selected during generation
])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
 
 $ionicConfigProvider.navBar.alignTitle('center'); // Align title center

  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'main/templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.connection', {
    url: '/connection',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/connection/connection.html',
		controller: 'ConnectionCtrl'
      }
    }
  })

  .state('app.iniscreen', {
    url: '/iniscreen',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/iniscreen/iniscreen.html',
		controller: 'IniscreenCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/connection');

}).run(function($ionicPlatform,$rootScope,$ionicPopup,$cordovaToast) {
  $ionicPlatform.ready(function() {
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

	//----------------------
	$rootScope.isCartIconVisible = false;
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		if(toState.name=='app.dashboard' || toState.name=='app.products' || toState.name=='app.products-detail' || toState.name=='app.filter' || toState.name=='app.search' ){
			$rootScope.isCartIconVisible = true;
		}else{
			$rootScope.isCartIconVisible = false;
		}
	});
	//----------------------
		$rootScope.tostMsg = function(msg){
			$cordovaToast
			.showShortTop(msg)
			.then(function(success) {
				// success
			}, function (error) {
				// error
			});
		}
	//----------------------
	 $rootScope.showAlert = function(msg) {	 
		 $ionicPopup.alert({ 
				title: 'Information', template: msg,
				buttons: [ { text: 'OK',type: 'button-balanced', } ]
			 });	
		 };

	//----------------------
  });
});
