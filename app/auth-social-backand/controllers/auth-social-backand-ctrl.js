'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, Utils, FlashService, Backand, AuthSocialBackandService) {
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  var vm = this;
  vm.data = {};
//go states
  vm.signUpGo = signUpGo;
  vm.signInGo = signInGo;
  vm.homeGo = homeGo;
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
  function homeGo () {
    $log.log('redirect...');
    $state.go('authSocialBackandHome');
  }
  function signinSocial (provider) {
    FlashService.Loading(true);
    $log.log('check connection...');
    var flagOnline = true;//get status connection for ionic platform
    if (!flagOnline) {
      $log.log('sigin by pass: connect off... ');
    } else {
      $log.log('open plugin connection...');
    //verify localStorage flag off line use
      FlashService.Question('Ignition Internet Now?', function () {
        AuthSocialBackandService.signinSocial(provider, authGo);
      });
    }

    FlashService.Loading(false);
  }

  function signout () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout();
      $state.go('authSocialBackandLogin');
    });
  }

  function signin () {
    if (vm.email && vm.password) {
      FlashService.Loading(true);
      AuthSocialBackandService.signin(vm.email, vm.password, homeGo);
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
    $state.go('authSocialBackandLogin');
    $log.log('update account with login');
  }

  function signUpGo () {
    $state.go('authSocialBackandSignUp');
  }
  function signInGo () {
    $state.go('authSocialBackandLogin');
  }

  function passwordUpdateGo () {
    vm.isUpdatePassword = true;
    $state.go('main.account');
  }
  function authGo () {
    $state.go('auth.home');//authSocialBackandLogin
  }
  function loginGo () {
    $state.go('authSocialBackandLogin');
  }

});
