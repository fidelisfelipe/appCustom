'use strict';

describe('module: main, controller: FacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var FacebookCtrl;
  beforeEach(inject(function ($controller) {
    FacebookCtrl = $controller('FacebookCtrl');
  }));

  it('should do something', function () {
    expect(!!FacebookCtrl).toBe(true);
  });

});
