'use strict';
angular.module('main')
.controller('AccountCtrl', function ($http, $timeout, $state, $log, Config, FlashService, AuthSocialBackandService) {
  var bind = this;
  $log.log('Hello from your Controller: AccountCtrl in module main:. This is your controller:', this);

  bind.updateAccountGo = updateAccountGo;
  bind.updatePasswordGo = updatePasswordGo;
  bind.signOut = signOut;

  function signOut () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout(login);
    });
  }
  function updateAccountGo () {
    $log.log('main.account');
    bind.isUpdateAccount = true;
    $state.go('main.account');
  }
  function updatePasswordGo () {
    $log.log('passwordUpdateGo');
  }
  function login () {
    $log.log('login');
  }
});
