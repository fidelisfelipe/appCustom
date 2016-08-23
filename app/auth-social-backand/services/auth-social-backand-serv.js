'use strict';
angular.module('authSocialBackand')
.service('AuthSocialBackandService', function ($log, $state, $http, $timeout, $rootScope, Utils, Config, FlashService, Backand) {
  $log.log('Hello from your Service: AuthSocialBackandService in module authSocialBackand');
  var service = this;
  service.signin = signin;
  service.signinSocial = signinSocial;
  service.signup = signup;
  service.signout = signout;
  service.menus = menus;

  service.unauthorized = unauthorized;
  service.onAuthorized = onAuthorized;
  service.onChangeSuccess = onChangeSuccess;
  service.updatePassword = updatePassword;
  service.updateAccount = updateAccount;

  service.getUserCurrent = function () {return Utils.getUserCurrent();};
  service.refreshData = function () {return Utils.refreshUserCurrentForData();};
  function menus (callback, fail) {
    $http.get('data/auth-social-backand/menus.json')
    .then(function (response) {
      if (response.status === 200) {
        callback(response.data);
      } else {
        fail();
      }
    }.bind(this))
      .then($timeout(function () {
      }.bind(this), 2000));
  }
  //socialSignIn
  function signinSocial (provider) {
    return Backand.socialSignIn(provider).then(function () {
      onAuthorized();
      $rootScope.$broadcast('signin');
    }, function (response) {
      FlashService.Error('Fail signout...', response.data && response.data.error_description || 'Fail on Login, retriver step...');
      $rootScope.$broadcast('signout');
    });
  }
  //signout
  function signout () {
    $log.log('signout...');
    Utils.setUserCurrentBlank();
    Backand.signout();
    $rootScope.$broadcast('signout');
  }
  //unauthorized
  function unauthorized () {
    $log.log('unauthorized...');
    Utils.setNotAuthorized;
    $state.go($state.current);
  }
  //signin
  function signin (email, password) {
    $log.log('signin...');
    return Backand.signin(email, password)
      .then(function (response) {
        if (response.error && response.error_description) {
          FlashService.Error('Fail Signin', response.error_description);
        } else {
          onAuthorized();
        }
      }, function (response) {
        FlashService.Error('Network Off?', response);
      });
  }
  //signup
  function signup (firstName, lastName, email, password, confirmPassword, callback) {
    $log.log('signup...');
    return Backand.signup(firstName, lastName, email, password, confirmPassword)
      .then(function (response) {
        Utils.onValidSignup(response, callback);
      }, function (response) {
        Utils.onErrorSignup(response);
      });
  }
  //onAuthorized
  function onAuthorized () {
    $log.log('authorized...');
    Backand.getUserDetails().then(function (data) {
      if (data && data.username !== undefined && data.regId) {
        //init user blank
        Utils.setUserCurrentBlank();
        //set user logon
        Utils.setUserCurrent(data);
        //sincronize data for user with model
        Utils.refreshUserCurrentForData();
        //set authorized post logon
        Utils.setIsAuthorized();
        //sincronize var user with root user
        Utils.refreshUserCurrentRoot();
        $rootScope.$broadcast('signin');
      } else {
        $log.log('undefined user current...');
      }
    });
  }
  //onChangeSuccess
  function onChangeSuccess (event, toState) {
    $log.log('state change...');
    if (toState.name === 'auth.login' && !Utils.isAuthorized) {
      service.signout();
    }
    else if (toState.name !== 'auth.login' && !Utils.isAuthorized && Backand.getToken() === undefined) {
      service.unauthorized();
    }
    else if (Backand.getToken() !== undefined && Backand.getToken() !== null && Backand.getToken().toString().length > -1) {
      $log.debug('token valid...');
      $state.go(toState.name);
    }
  }
  //updatePassword
  function updatePassword (passwordCurrent, passwordNew) {
    Backand.changePassword(passwordCurrent, passwordNew)
      .then(function (response) {
        Utils.onValidUpdatePassword(response, service.signout);
      }, Utils.onErrorUpdatePassword);
  }
  //updateAccount
  function updateAccount (firstName, lastName, id) {
    var returnObject = true;
    var name = 'users';
    var userData = {
      'grant_type': 'text',
      'firstName': firstName,
      'lastName': lastName
    };
    return $http({
      method: 'PUT',
      url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
      data: userData,
      params: {
        returnObject: returnObject
      }
    }).then(Utils.onValidUpdateAccount, Utils.onErrorUpdateAccount);
  }
});
