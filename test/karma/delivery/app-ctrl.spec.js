'use strict';

describe('module: delivery, controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('delivery'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AppCtrl;
  beforeEach(inject(function ($controller) {
    AppCtrl = $controller('AppCtrl');
  }));

  it('should do something', function () {
    expect(!!AppCtrl).toBe(true);
  });

});
