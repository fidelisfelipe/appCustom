'use strict';

describe('module: main, controller: SettingCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var SettingCtrl;
  beforeEach(inject(function ($controller) {
    SettingCtrl = $controller('SettingCtrl');
  }));

  it('should do something', function () {
    expect(!!SettingCtrl).toBe(true);
  });

});
