'use strict';

describe('module: delivery, controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('delivery'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var HomeCtrl;
  beforeEach(inject(function ($controller) {
    HomeCtrl = $controller('HomeCtrl');
  }));

  it('should do something', function () {
    expect(!!HomeCtrl).toBe(true);
  });

});
