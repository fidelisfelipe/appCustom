'use strict';
angular.module('delivery.services')
.factory('progressService', function ($ionicLoading) {

  //-----------------------------------------------
  //Show and hide progress indicator for loading actions

  var service = {
    showLoader: function (text) {
      if (!text) {text = '<ion-spinner icon="spiral"></ion-spinner>';}
      $ionicLoading.show({template: text});
    },

    hideLoader: function () {
      $ionicLoading.hide();
    }
  };

  return service;
});

angular.module('delivery.services')
.factory('alertmsgService', function ($ionicPopup, $cordovaToast) {

  var service = {
    showMessage: function (msg) {
      $ionicPopup.alert({
        title: 'Information', template: msg,
        buttons: [ { text: 'OK', type: 'button-balanced', } ]
      });
    },
    tostMessage: function (msg) {
      $cordovaToast
        .showShortTop(msg)
        .then(function (success) {
            // success
        }, function (error) {
            // error
        });
    }
  };
  return service;
});
