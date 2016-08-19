'use strict';
angular.module('authSocialBackand')
.controller('HomeCtrl', function ($log, $state) {

  $log.log('Hello from your Controller: HomeCtrl in module auth-social-backand:. This is your controller:', this);
  (function init () {
    $log.log('current state:', $state.current.name);
    $state.go('main.home');
  })();
});
