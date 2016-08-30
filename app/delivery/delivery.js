'use strict';
angular.module('delivery', [
  'ionic',
  'delivery.controllers',
  'delivery.directives',
  'delivery.services',
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

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'delivery/templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.connection', {
      url: '/connection',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/connection/connection.html',
          controller: 'ConnectionCtrl'
        }
      }
    })

    .state('app.iniscreen', {
      url: '/iniscreen',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/iniscreen/iniscreen.html',
          controller: 'IniscreenCtrl'
        }
      }
    })

    .state('app.select-location', {
      url: '/select-location',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/iniscreen/select-location.html',
          controller: 'IniLocationCtrl'
        }
      }
    })

    .state('app.inisignup', {
      url: '/inisignup',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/iniscreen/inisignup.html',
          controller: 'IniSignupCtrl'
        }
      }
    })

    .state('app.inilogin', {
      url: '/inilogin',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/iniscreen/inilogin.html',
          controller: 'IniLoginCtrl'
        }
      }
    })
//-----------------
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

    .state('app.products', {
      cache: false,
      url: '/products/:catid',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/products/products.html',
          controller: 'ProductsCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search/:catid/:catname',
      views: {
        'menuContent': {
          templateUrl: 'delivery/templates/products/products.html',
          controller: 'ProductsCtrl'
        }
      }
    })

   .state('app.products-detail', {
     url: '/products-detail/:proid',
     views: {
       'menuContent': {
         templateUrl: 'delivery/templates/products/products-detail.html',
         controller: 'ProductsDetailCtrl'
       }
     }
   })

   .state('app.filter', {
     url: '/filter/:catid',
     views: {
       'menuContent': {
         templateUrl: 'delivery/templates/products/products-filter.html',
         controller: 'ProductsFilterCtrl'
       }
     }
   })
//-----------------
   .state('app.shopping-cart', {
     cache: false,
     url: '/shopping-cart',
     views: {
       'menuContent': {
         templateUrl: 'delivery/templates/cart/cart.html',
         controller: 'CartCtrl'
       }
     }
   })

 .state('app.delivery-address', {
   cache: false,
   url: '/delivery-address',
   views: {
     'menuContent': {
       templateUrl: 'delivery/templates/cart/delivery-address.html',
       controller: 'CartDeliveryCtrl'
     }
   }
 })

  .state('app.delivery-options', {
    cache: false,
    url: '/delivery-options',
    views: {
      'menuContent': {
        templateUrl: 'delivery/templates/cart/delivery-options.html',
        controller: 'CartOptionsCtrl'
      }
    }
  })

  .state('app.place-order', {
    cache: false,
    url: '/place-order',
    views: {
      'menuContent': {
        templateUrl: 'delivery/templates/cart/place-order.html',
        controller: 'CartOrderCtrl'
      }
    }
  })

  .state('app.order-status', {
    cache: false,
    url: '/order-status/:status_id',
    views: {
      'menuContent': {
        templateUrl: 'delivery/templates/cart/order-status.html',
        controller: 'CartOrderStatusCtrl'
      }
    }
  })
//-----------------
  .state('app.orders', {
    cache: false,
    url: '/orders',
    views: {
      'menuContent': {
        templateUrl: 'delivery/templates/orders/orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })


  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'delivery/templates/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/connection');

}).run(function ($ionicPlatform, $rootScope, $ionicPopup, $cordovaToast) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
/*eslint-disable no-undef */
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

//----------------------
    $rootScope.isCartIconVisible = false;
/*eslint-disable no-unused-vars */
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'app.dashboard' || toState.name === 'app.products' || toState.name === 'app.products-detail' || toState.name === 'app.filter' || toState.name === 'app.search' ) {
        $rootScope.isCartIconVisible = true;
      } else {
        $rootScope.isCartIconVisible = false;
      }
    });
//----------------------
    $rootScope.tostMsg = function (msg) {
      $cordovaToast
        .showShortTop(msg)
        .then(function (success) {
// success
        }, function (error) {
// error
        });
    };
//----------------------
    $rootScope.showAlert = function (msg) {
      $ionicPopup.alert({
        title: 'Information', template: msg, buttons: [ { text: 'OK', type: 'button-balanced', } ]
      });
    };

//----------------------
  });
});
