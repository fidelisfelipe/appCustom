'use strict';
angular.module('delivery.services')
.factory('categoryService', function ($http) {

  var service = {
    getCategories: function () {
      return $http.get('data/delivery/dashboard/multicategory.json');
    }
  };

  return service;
});
