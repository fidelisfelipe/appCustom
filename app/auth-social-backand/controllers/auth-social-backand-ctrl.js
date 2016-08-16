'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, Utils, FlashService, Backand, AuthSocialBackandService) {
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  var vm = this;
  vm.data = {};
//go states
  vm.signUpGo = signUpGo;
  vm.updateAccountGo = updateAccountGo;
  vm.updatePasswordGo = passwordUpdateGo;

  vm.signin = signin;
  vm.signUp = signUp;
  vm.signout = signout;
  vm.signinSocial = signinSocial;

  vm.updateAccount = updateAccount;
  vm.toogleUpdate = function () {return !vm.showUpdate;};

  (function init () {
    vm.currentUser = AuthSocialBackandService.getUserCurrent();
    vm.updatePwd = false;
    vm.showUpdate = true;
    $log.log('current state:', $state.current.name);
    $log.debug('vm.currentUser:', vm.currentUser);
    $log.debug('vm.updatePwd:', vm.updatePwd);
  })();

  function signinSocial (provider) {
    FlashService.Loading(true);
    AuthSocialBackandService.signinSocial(provider, loginGo);
    FlashService.Loading(false);
  }

  function signout () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout();
      $state.go('authSocialBackandLogin');//authSocialBackandLogin
    });
  }

  function signin () {
    if (vm.email && vm.password) {
      FlashService.Loading(true);
      AuthSocialBackandService.signin(vm.email, vm.password, loginGo);
      FlashService.Loading(false);
    } else {
      $log.log('not sended info for login...');
      FlashService.Error('Set E-mail and Password...');
    }
  }

  function signUp () {
    FlashService.Loading(true);
    AuthSocialBackandService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again, loginGo);
    FlashService.Loading(false);
  }
  function updateAccount () {
    $log.debug('update data', vm.updatePwd);
    FlashService.Loading(true);
    if (!vm.updatePwd) {
      AuthSocialBackandService.updateAccount(vm.currentUser.firstName, vm.currentUser.lastName, vm.currentUser.userId);
    } else {
      AuthSocialBackandService.updatePassword(vm.currentUser.passwordCurrent, vm.currentUser.passwordNew);
    }
    FlashService.Loading(false);
    $state.go($state.current.name);
  }

  function updateAccountGo () {
    vm.isUpdateAccount = true;
    $state.go('main.account');
  }

  function signUpGo () {
    $state.go('authSocialBackandSignUp');
  }

  function passwordUpdateGo () {
    vm.isUpdatePassword = true;
    $state.go('main.account');
  }
  function loginGo () {
    $state.go('main.home');//authSocialBackandLogin
  }

});
