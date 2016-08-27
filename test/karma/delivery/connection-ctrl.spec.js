'use strict';

describe('module: delivery, controller: ConnectionCtrl', function () {

  // load the controller's module
  beforeEach(module('delivery'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ConnectionCtrl;
  beforeEach(inject(function ($controller) {
    ConnectionCtrl = $controller('ConnectionCtrl');
  }));

  it('should do something', function () {
    expect(!!ConnectionCtrl).toBe(true);
  });

});
