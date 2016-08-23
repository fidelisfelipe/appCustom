'use strict';
angular.module('app', [
  // load your modules here
// starting with the main module
  'main',
  'authSocialBackand',
]).run(function ($rootScope) {
  $rootScope.title = 'App Custom';
});
