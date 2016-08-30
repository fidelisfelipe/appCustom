'use strict';
angular.module('delivery.services')
.factory('usersService', function ($http) {
  var service = {
    userDetails: function () {
      return $http.get('data/delivery/user/account.json');
    },
    userLogout: function () {
      return $http.get('/data/delivery/user/logout.json');
    },
    getCountries: function () {
      return $http.get('/data/delivery/user/countries.json');
    },
  };
  return service;
});
