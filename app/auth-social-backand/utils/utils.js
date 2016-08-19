'use strict';
angular.module('authSocialBackand')
.service('Utils', function ($log, $rootScope, $http, FlashService, Backand) {
  var user =  new function () {
    this.userId = 0;
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.isAuthorized = false;
    this.isAdmin = false;
  };
  var Utils = {
/**
 * Functions for Callback features
 */
//onValidUpdateAccount
    onValidUpdateAccount: function (response) {
      if (response.status === 200) {
        //sincronize data for user with model
        Utils.refreshUserCurrentForData();
        //set authorized post logon
        Utils.setIsAuthorized();
        //sincronize var user with root user
        Utils.refreshUserCurrentRoot();
        FlashService.Success('Change account successfull...');
      } else {
        FlashService.Error(response.data);
      }
    },
//onErrorUpdateAccount
    onErrorUpdateAccount: function (response) {
      FlashService.Error(response.data);
    },
//onValidSignup
    onValidSignup: function (response, callback) {
      FlashService.Success('Sign Up Successfull!');
      callback();
    },
//onErrorSignup
    onErrorSignup: function (response) {
      $log.log('sigup error: ', response.data);
      if (response.status === 406) {
        if (response.data.error_description === 'Membership failure:InvalidPassword') {
          FlashService.Error('password is lenght invalid! Must 6 digits!');
        } else {
          FlashService.Error(response.data.error_description);
        }
      } else {
        FlashService.Error(response.data.error_description);
      }
    //TODO: 417 - Critcal Exception (not exist error_description, sigup_error: 'An unexpected signup  exception occured') with enable e-mail confirm
    },
//onValidUpdatePassword
    onValidUpdatePassword: function (data, logout) {
      FlashService.Success('Change password successfull...');
      logout();
    },
//onErrorUpdatePassword
    onErrorUpdatePassword: function (data) {
      FlashService.Error(data.data);
    },
/**
 * Functions for User
 */
//setUserCurrent
    setUserCurrent: function (data) {
      user.userId = data.userId || data.id;
      user.username = data.username;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      user.isAdmin = (user.role === 'Admin');
      user.srcImg = 'main/assets/images/profile.jpg';
      sessionStorage.currentUser = user;
    },
//setUserForDataDomain
    setUserForDataDomain: function (data) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
    },
//setUserCurrentBlank
    setUserCurrentBlank: function () {
      user.userId = 0;
      user.username = '';
      user.firstName = '';
      user.lastName = '';
      user.role = '';
      user.isAdmin = false;
      user.isAuthorized = false;
      user.srcImg = '';
      sessionStorage.removeItem('currentUser');
    },
//setIsAuthorized
    setIsAuthorized: function () {
      user.isAuthorized = true;
    },
//setNotAuthorized
    setNotAuthorized: function () {
      user.isAuthorized = false;
    },
//isAutorized
    isAuthorized: function () {

      return user.isAuthorized;
    },
//getUserCurrent
    getUserCurrent: function () {
      if (JSON.parse(sessionStorage.getItem('currentUser')) !== null) {
        user =  JSON.parse(sessionStorage.getItem('currentUser'));
      }
      return user;
    },
//refreshUserCurrentRoot
    refreshUserCurrentRoot: function () {
      sessionStorage.currentUser = JSON.stringify(user);
    },
//refreshUserCurrentForData
    refreshUserCurrentForData: function () {

      $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users/' + user.userId + '?exclude=items%2C%20__metadata'
      }).then(function (response) {
        Utils.setUserForDataDomain(response.data);
        Utils.refreshUserCurrentRoot();
      }, function (error) {
        $log.debug('fail update: ', error);
      });

    }
  };
  return Utils;
});
