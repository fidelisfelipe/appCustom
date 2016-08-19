'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, Utils, FlashService, Backand, AuthSocialBackandService) {
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  var bind = this;
  bind.data = {};

  bind.signUpGo = signUpGo;
  bind.signInGo = signInGo;
  bind.homeGo = homeGo;
  bind.updateAccountGo = updateAccountGo;
  bind.updatePasswordGo = passwordUpdateGo;

  bind.signIn = signIn;
  bind.signUp = signUp;
  bind.signOut = signOut;
  bind.signinSocial = signinSocial;

  bind.updateAccount = updateAccount;
  bind.toogleUpdate = function () {return !bind.showUpdate;};

  (function init () {
    bind.currentUser = AuthSocialBackandService.getUserCurrent();
    bind.updatePwd = false;
    bind.showUpdate = true;
  })();
  function homeGo () {
    $state.go('authSocialBackandHome');
  }
  function signinSocial (provider) {
    FlashService.Loading(true);
    var flagOnline = true;//get status connection for ionic platform
    if (flagOnline) {
    //verify localStorage flag off line use
      FlashService.Question('Ignition Internet Now?', function () {
        AuthSocialBackandService.signinSocial(provider, home);
      });
    }

    FlashService.Loading(false);
  }

  function signOut () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout(login);
    });
  }

  function signIn () {
    FlashService.Loading(true);
    if (bind.email && bind.password) {
      AuthSocialBackandService.signin(bind.email, bind.password, home);
    } else {
      FlashService.Loading(false);
      FlashService.Error('Set E-mail and Password...');
    }
  }

  function signUp () {
    FlashService.Loading(true);
    AuthSocialBackandService.signup(bind.firstName, bind.lastName, bind.email, bind.password, bind.again, login);
    FlashService.Loading(false);
  }
  function updateAccount () {
    FlashService.Loading(true);
    if (!bind.updatePwd) {
      AuthSocialBackandService.updateAccount(bind.currentUser.firstName, bind.currentUser.lastName, bind.currentUser.userId);
    } else {
      AuthSocialBackandService.updatePassword(bind.currentUser.passwordCurrent, bind.currentUser.passwordNew);
    }
    FlashService.Loading(false);
    $state.go($state.current.name);
  }

  function updateAccountGo () {
    bind.isUpdateAccount = true;
    $state.go('authSocialBackandAccount');
  }

  function signUpGo () {
    $state.go('authSocialBackandSignUp');
  }
  function signInGo () {
    $state.go('authSocialBackandSignIn');
  }

  function passwordUpdateGo () {
    bind.isUpdatePassword = true;
    $state.go('authSocialBackandAccount');
  }
  function home () {
    FlashService.Loading(false);
    $state.go('main.home');
  }
  function login () {
    $state.go('authSocialBackandLogin');
  }

});
