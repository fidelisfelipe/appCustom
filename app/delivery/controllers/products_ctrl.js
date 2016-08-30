'use strict';
//TODO: migrar para serviço util
function getSelectedFilter (data, seletedArray, ftype) {
  angular.forEach(data, function (obj) {
    angular.forEach(seletedArray, function (id) {
      if (ftype === 'brands') {if (obj.brand_id === id) { obj.selected = true; }}
      if (ftype === 'price') {if (obj.pricefilter === id) { obj.selected = true; }}
      if (ftype === 'discount') {if (obj.discountfilter === id) { obj.selected = true; }}
    });
  });
  return data;
}
function getParentCat (results, findId) {
  for (var i = 0; i < results.length; i++) {
    if (results[i].category_id === findId) {
      //console.log(results[i].toSource());
      return results[i];
    } else {
      var subcat = results[i].subCollection;
      if ( subcat !== null) {
        for (var j = 0; j < subcat.length; j++) {
          if (subcat[j].category_id === findId) {
            //console.log(subcat[j].category_id);
            //console.log(results[i].toSource());
            return results[i];
          }
        }
      }
    }
  }
}
//----------------------
/*eslint-disable camelcase */
angular.module('delivery.controllers')
.controller('ProductsCtrl', function ($log, $scope, $rootScope, $location, $timeout, $ionicModal, $stateParams, $ionicScrollDelegate, productsService, progressService, eCart, ionicMaterialInk) {

  $scope.catId = $stateParams.catid;
  $scope.catname = $stateParams.catname;
  $log.log($scope.catname);
  $rootScope.sortProductBy = 'sort_order-ASC';
  $scope.noRecords = false;
  //----------Lasy Loading of Products---------------------------
  $scope.loadMoreProducts = function () {
    $scope.catId = 1;
    $scope.noRecords = false;
    if ($scope.catId !== 1 && $scope.catId !== 7) {
      $scope.noProductsAvailable = true;
      $scope.noRecords = true;
    } else {
      productsService.getProducts($scope.catId, $scope.catname, $scope.product_page)
      .then(function (response) {
        if (response.data.success) {
          $scope.products  = $scope.products.concat(response.data.data);
          $scope.newProducts  = $scope.newProducts.concat(response.data.latest_products);
          $scope.product_page++;
          $scope.noProductsAvailable = false;// On lasy loading.
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          $scope.noProductsAvailable = true;// Off lasy loading.
          if ($scope.product_page === 1) {$scope.noRecords = true;}
        }
/*eslint-disable no-unused-vars */
      }, function (error) {
        $scope.noProductsAvailable = true;// Off lasy loading.
      });
    }
  };

   //---------------------------
  $rootScope.showProducts = function (catId) {
    //$scope.category_id =$scope.catId;
    if (catId !== '' && typeof(catId) !== 'undefined') {$scope.catId = catId;}

    $ionicScrollDelegate.scrollTop();
    /*eslint-disable no-undef */
    $scope.selectedCat = findCategory($rootScope.accordionArray, $scope.catId);
    $scope.parentCats  = getParentCat($rootScope.accordionArray, $scope.catId);

    $scope.noProductsAvailable  = true; // Off lasy loading.
    $scope.product_page = 1;
    $scope.products   = [];
    $scope.newProducts   = [];

    $scope.loadMoreProducts();
  };
  $rootScope.showProducts();
//---------------------------
  $scope.showProductDetail = function (prodId) { $location.path('app/products-detail/' + prodId);};

   //----------Cart Process--------------------
  $scope.selectId = '';
  $scope.AddToCart = function (prodObj) {
    $scope.selectId = prodObj.id;
    $timeout(function () {$scope.selectId = '';}, 700);
    eCart.addToCart(prodObj);
    $rootScope.cartItems = eCart.cartProducts.length;
  };

  //------Sub categoryes Options-----
  $ionicModal.fromTemplateUrl('delivery/templates/products/products-cats.html', { scope: $scope })
  .then(function (modal) { $scope.categoryModal = modal; });
  $scope.catsClose = function () { $scope.categoryModal.hide(); };
  $scope.catsShow = function () { $scope.categoryModal.show(); };

  //------Sort Options-----
  $ionicModal.fromTemplateUrl('delivery/templates/products/products-sort.html', { scope: $scope })
  .then(function (modal) { $scope.sortModal = modal;});
  $scope.sortClose = function () { $scope.sortModal.hide(); };
  $scope.sortShow = function () {
    $scope.sortOptions = [
      {name: 'Default', val: 'sort_order-ASC'},
      {name: 'Product Title A to Z', val: 'name-ASC'},
      {name: 'Product Title Z to A', val: 'name-DESC'},
      {name: 'Price- Low to High', val: 'price-ASC'},
      {name: 'Price- High to Low', val: 'price-DESC'}
    ];
    $scope.sortModal.show();
  };
  $scope.setProductSort = function (data) { $rootScope.sortProductBy = data; $scope.sortModal.hide(); $scope.showProducts(); };
  $scope.pro_attr = '0-0-0';
  //-----------------------
  /*$scope.selectAttrib = function(pid,att_price,pro_price){
   var tmpArray = att_price.split("|");
   var newPrice = (parseFloat(pro_price)+parseFloat(tmpArray[3])).toFixed(2);
   console.log(tmpArray[0]+" : "+tmpArray[1]+" : "+tmpArray[2]+" : "+tmpArray[3]);

  if(tmpArray[1]>0){
   angular.element(document.querySelector('#sprice_'+pid)).addClass("hidePrice");
   angular.element(document.querySelector('#attrprice_'+pid)).removeClass("hidePrice");
   angular.element(document.querySelector('#attramt_'+pid)).html(newPrice);
   var tmp = tmpArray[0]+"|"+tmpArray[1]+"|"+tmpArray[2];
   angular.element(document.querySelector('#selectedattr_'+pid)).attr('attval',tmp);
  }else{
   angular.element(document.querySelector('#sprice_'+pid)).removeClass("hidePrice");
   angular.element(document.querySelector('#attrprice_'+pid)).addClass("hidePrice");
   angular.element(document.querySelector('#attramt_'+pid)).html('');
  angular.element(document.querySelector('#selectedattr_'+pid)).attr('attval','');
  }
  }*/
  //-----------------------

  ionicMaterialInk.displayEffect();
})

.controller('ProductsFilterCtrl', function ($scope, $rootScope, $location, $stateParams, productsService, ionicMaterialInk) {

  $scope.catId  = $stateParams.catid;

  $scope.brandFilter = [];
  $scope.priceFilter = [];
  $scope.discountFilter = [];
  productsService.getFilterOptions($scope.catId)
  .then(function (response) {

    $scope.filterData = response.data;

    $scope.brandFilter  = response.data.brands_filter;
    $scope.priceFilter  = response.data.pricefilter;
    $scope.discountFilter  = response.data.discountfilter;

    getSelectedFilter($scope.brandFilter, productsService.getFilterData($scope.catId, 'brands'), 'brands');// Select Filter values
    getSelectedFilter($scope.priceFilter, productsService.getFilterData($scope.catId, 'price'), 'price');// Select Filter values
    getSelectedFilter($scope.discountFilter, productsService.getFilterData($scope.catId, 'discount'), 'discount');// Select Filter values

  }, function (error) {
    alert('Error proudcts : ' + error);
  });

  //-------Watch filter changes------
  $scope.$watch('brandFilter|filter:{selected:true}', function (nv) { $scope.bids = nv.map(function (brand) { return brand.brand_id; });   }, true);
  $scope.$watch('priceFilter|filter:{selected:true}', function (nv) { $scope.prange_val = nv.map(function (pricerange) { return pricerange.pricefilter; });  }, true);
  $scope.$watch('discountFilter|filter:{selected:true}', function (nv) { $scope.drange_val = nv.map(function (discrange) { return discrange.discountfilter; });  }, true);
  //-----------------------
  $scope.applyFilter = function () {
    productsService.setFilterData($scope.catId, 'brands', $scope.bids);/*set barnds filters */
    productsService.setFilterData($scope.catId, 'price', $scope.prange_val);/*set price filters */
    productsService.setFilterData($scope.catId, 'discount', $scope.drange_val);/*set discount filters */

    $rootScope.showProducts($scope.catId);
    $location.path('app/products/' + $scope.catId);
  };
  $scope.resetFilter = function () {
    $rootScope.brandsFobj = [];  $rootScope.priceFobj = [];  $rootScope.discFobj = [];
    $rootScope.showProducts($scope.catId);
    $location.path('app/products/' + $scope.catId);
  };
  //-----------------------
})

.controller('ProductsDetailCtrl', function ($scope, $rootScope, $stateParams, $timeout, eCart, productsService, ionicMaterialInk) {

  productsService.getProductDetail($stateParams.proid)
  .then(function (response) {
    //alert("Success : "+response);
    $scope.productDetail = response.data.data;

  }, function (error) {
    alert('Error proudcts : ' + error);
  });

  //-------------------------------
  $scope.selectId = '';
  $scope.AddToCart = function (prodObj) {
    $scope.selectId = prodObj.id;
    $timeout(function () {$scope.selectId = '';  }, 700);
    eCart.addToCart(prodObj);
    $rootScope.cartItems = eCart.cartProducts.length;
  };
  //-------------------------------

  ionicMaterialInk.displayEffect();
});
