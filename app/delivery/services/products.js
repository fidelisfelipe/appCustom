'use strict';
function toObject (arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) {
    rv[i] = arr[i];
  }
  return rv;
}

angular.module('delivery.services')
.factory('productsService', function ($rootScope, $http) {
  var service = {
/*eslint-disable no-unused-vars */
    getProducts: function (catid, title, paged) {

/*RewriteRule ^api/rest/products/category/?([0-9]+)/limit/?([0-9]+)/page/?([0-9]+)/order/?([a-zA-Z]+)/sort/?([a-zA-Z]+)/filtersdata/?([0-9,-|]+)  [L]*/

/* var sortArray = $rootScope.sortProductBy.split('-');

  var paging= 5;
  if (paged>1) {paging = 10;}

  if (catid>0) {
    var fliter_val = '';
    var bf_val = service.getFilterData(catid,'brands');
    var pf_val = service.getFilterData(catid,'price');
    var df_val = service.getFilterData(catid,'discount');
    if (bf_val!='' || pf_val!='' || df_val!='' ) {fliter_val = bf_val + '|' + pf_val + '|' + df_val;}

    if(fliter_val!=''){
      var apiURL = '/data/delivery/product/productsfl'+catid+'-'+paging+'-'+paged+'-'+sortArray[1]+'-'+sortArray[0]+'-filter'+fliter_val;
    }else{
      var apiURL = '/data/delivery/product/products'+catid+'-'+paging+'-'+paged+'-'+sortArray[1]+'-'+sortArray[0];
    }
  } else {
    var apiURL = '/data/delivery/product/productsr'+title+'-10-'+paged+'-'+sortArray[1]+'-'+sortArray[0];
  }
  var showloader = 'Y'; if(paged>1)showloader = 'N';*/
      return $http.get('data/delivery/product/products1-5-1-ASC-name.json');
    },
    getProductDetail: function (prodId) {
      return $http.get('data/delivery/product/detail.json');
    },
    getFilterOptions: function (catId) {
      return $http.get('data/delivery/product/filter.json');
    },
    setFilterData: function (catId, ftype, arrayval) {
      if (typeof($rootScope.brandsFobj) === 'undefined') {$rootScope.brandsFobj = [];}
      if (typeof($rootScope.priceFobj) === 'undefined') {$rootScope.priceFobj = [];}
      if (typeof($rootScope.discFobj) === 'undefined') {$rootScope.discFobj = [];}

      if (arrayval !== '' && typeof(arrayval) !== 'undefined') {
        if (ftype === 'brands') {$rootScope.brandsFobj[catId] = toObject(arrayval);}
        if (ftype === 'price') {$rootScope.priceFobj[catId] = toObject(arrayval);}
        if (ftype === 'discount') {$rootScope.discFobj[catId] = toObject(arrayval);}
      } else {
        if (ftype === 'brands') {$rootScope.brandsFobj[catId] = {};}
        if (ftype === 'price') {$rootScope.priceFobj[catId] = {};}
        if (ftype === 'discount') {$rootScope.discFobj[catId] = {};}
      }
    },
    getFilterData: function (catId, ftype) {
      if (typeof($rootScope.brandsFobj) === 'undefined') {$rootScope.brandsFobj = [];}
      if (typeof($rootScope.priceFobj) === 'undefined') {$rootScope.priceFobj = [];}
      if (typeof($rootScope.discFobj) === 'undefined') {$rootScope.discFobj = [];}

      var tval = '';
      if (ftype === 'brands') {tval = $rootScope.brandsFobj[catId];}
      if (ftype === 'price') {tval = $rootScope.priceFobj[catId];}
      if (ftype === 'discount') {tval = $rootScope.discFobj[catId];}

      if (typeof(tval) === 'undefined') {
        return '';
      } else {
        return Object.keys(tval).map(function (key) {return tval[key];});
      }
    }
  };
  return service;
});

//waze
