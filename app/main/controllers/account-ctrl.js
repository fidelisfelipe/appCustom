'use strict';
angular.module('main')
.controller('AccountCtrl', function ($http, $timeout, $state, $log, Config, FlashService) {
  var bind = this;
  $log.log('Hello from your Controller: AccountCtrl in module main:. This is your controller:', this);
  this.backendRequestUrl = Config.ENV.DOMAIN_BACKEND_URL;
  bind.addStatus = '';
  this.createAccount = function () {
    this.submit = {test: {descricao: 'Descrição'}};
    $log.log('send account');
    FlashService.Loading(true, 'send request...');
    $http({
      url: this.backendRequestUrl + '/tests/add',
      method: 'post',
      data: this.submit
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.addStatus = response.status;
      $state.go('main.home');
    }.bind(this))
      .then($timeout(function () {
        FlashService.Loading(false);
        if (bind.addStatus === '') {
          FlashService.Error('Fail create account!');
        }
      }.bind(this), 6000));
  };
});
