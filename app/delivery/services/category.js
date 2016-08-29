angular.module('delivery.services')
.factory('categoryService', function($http) {
  'use strict';

  var service = {
    getCategories: function () {		 
		 return $http.get("data/delivery/dashboard/multicategory.json");
		 
    }
  };

  return service;
});
