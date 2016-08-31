'use strict';
angular.module('delivery.controllers')
.controller('DashboardCtrl', function ($scope, $rootScope, $ionicModal, usersService, categoryService, dashboardService, ionicMaterialInk) {

//--------Get Category------------------------
  categoryService.getCategories()
    .then(function (response) {
      $rootScope.accordionArray = response.data.data;
       /*eslint-disable no-undef */

      $rootScope.searchDefaultCats = getAutoSuggest($rootScope.accordionArray);
    }, function (error) {
      $rootScope.tostMsg(error);
    });
//--------Banners------------------------
  dashboardService.getBanners()
  .then(function (response) {
    $rootScope.bannerData = response.data.appbanners.slider;
  }, function (error) {
    $rootScope.tostMsg(error);
  });
//--------Get User Data---------------------
  if ($rootScope.userData === '' || typeof($rootScope.userData) === 'undefined') {
    usersService.userDetails()
    .then(function (response) {
      if (response.success) {
        $rootScope.userData = response.data;
      }
    });
  }
//----------------------------------

  ionicMaterialInk.displayEffect();
});
