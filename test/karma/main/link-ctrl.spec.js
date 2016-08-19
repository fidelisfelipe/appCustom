'use strict';

describe('module: main, controller: LinkCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LinkCtrl;
  beforeEach(inject(function ($controller) {
    LinkCtrl = $controller('LinkCtrl');
  }));

  it('should do something', function () {
    expect(!!LinkCtrl).toBe(true);
  });

});
