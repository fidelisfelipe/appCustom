'use strict';
angular.module('main')
.controller('HomeCtrl', function ($log, $stateParams, $state) {

  $log.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);
  $log.log('link dinamic: ', $state.params);
  this.title = 'AppCustom';
});
