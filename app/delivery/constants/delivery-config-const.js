'use strict';
angular.module('delivery')
.constant('DeliveryConfig', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://DEVSERVER/api',
    'SOME_OTHER_URL': '/proxy',
    'DOMAIN_BACKEND_URL': 'http://localhost:8080/ifly-backend'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
