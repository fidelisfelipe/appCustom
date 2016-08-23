'use strict';

describe('module: main, controller: UploadCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var UploadCtrl;
  beforeEach(inject(function ($controller) {
    UploadCtrl = $controller('UploadCtrl');
  }));

  it('should do something', function () {
    expect(!!UploadCtrl).toBe(true);
  });

});
