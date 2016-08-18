'use strict';
var $stateProviderRef = null;
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/home');
  $stateProviderRef = $stateProvider;
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'AuthSocialBackandCtrl as vm',
    });
}).run(function ($rootScope, $state, $log, Main) {
  $rootScope.$on('$stateChangeSuccess', function () {$log.log($state.current.name === 'main.debug'); if ($state.current.name === 'main.debug') {Main.backendOnline();}});
  $rootScope.title = 'Entregas';
//get menu dinamic
  $rootScope.menus = Main.menus(function setMenus (menus) {$log.log('response menus main: ', menus);});
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
});
