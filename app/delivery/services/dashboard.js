angular.module('delivery.services')
.factory('dashboardService', function($http) {
  'use strict';

  var service = {
    getBanners: function () {			
		return	$http.get("data/delivery/dashboard/appbanners.json")
    }
  };

  return service;
});


//waze
