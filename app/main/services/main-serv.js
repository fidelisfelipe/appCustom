'use strict';
angular.module('main')
.service('Main', function ($log, $timeout, $http, $rootScope, Config) {
  var bind = this;
  $rootScope.backendLabelTest = 'loading status backend...';
  $log.log('Hello from your Service: Main in module main');
  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah Service Working!';
    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

  this.features = function (callback, fail) {
    $http.get(Config.ENV.DOMAIN_BACKEND_URL + '/features')
    .then(function (response) {
      if (response.status === 200) {
        callback(response.data.features);
      } else {
        fail();
      }
    }.bind(this))
      .then($timeout(function () {
      }.bind(this), 6000));
  };
  this.menus = function (callback, fail) {
    //$http.get(Config.ENV.DOMAIN_BACKEND_URL + '/menus')
    $http.get('data/main/menus.json')
    .then(function (response) {
      if (response.status === 200) {
        $log.log('get menus dinamic - main...');
        callback(response.data);
      } else {
        fail();
      }
    }.bind(this))
      .then($timeout(function () {
      }.bind(this), 2000));
  };

  this.backendOnline = function () {
    $log.log('backendOnline testing...');
    bind.status = false;
    $http({url: Config.ENV.DOMAIN_BACKEND_URL + '/', method: 'get', headers: {'Content-Type': 'application/json'}}).then(function (response) {
      if (response.status === 200) {
        bind.status = true;
      } else {
        bind.status = false;
      }
    }.bind(this)).then($timeout(function () {
      $rootScope.backendOnline = bind.status;
      $rootScope.backendLabelTest = (bind.status ? 'OK' : 'Fail');
    }.bind(this), 5000));
  };
});
