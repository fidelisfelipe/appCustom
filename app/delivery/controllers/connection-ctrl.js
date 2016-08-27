'use strict';
angular.module('delivery')
.controller('ConnectionCtrl', function ($log, $scope, $rootScope, ionicMaterialInk, $ionicSideMenuDelegate) {

  $log.log('Hello from your Controller: ConnectionCtrl in module delivery:. This is your controller:', this);
  $rootScope.accordionConfig = {
    debug: false, //For developing
    animDur: 300, //Animations duration minvalue is 0
    expandFirst: false, //Auto expand first item
    autoCollapse: true, //Auto collapse item flag
    watchInternalChanges: false, //watch internal attrs of the collection (false if not needed)
    headerClass: '', //Adding extra class for the headers
    beforeHeader: '', //Adding code or text before all the headers inner content
    afterHeader: '', //Adding code or text after all the headers inner content
    topContentClass: '', //Adding extra class for topContent
    beforeTopContent: '', //Adding code or text before all the topContent if present on item
    afterTopContent: '', //Adding code or text after all the topContent if present on item
    bottomContentClass: '', //Adding extra class for topContent
    beforeBottomContent: '', //Adding code or text before all the topContent if present on item
    afterBottomContent: '', //Adding code or text before all the topContent if present on item
    menuLink: '#/app/products' //Adding code or text before all the topContent if present on item
  };
  $scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
  ionicMaterialInk.displayEffect();
});
