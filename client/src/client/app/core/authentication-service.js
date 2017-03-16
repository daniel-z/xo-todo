(function() {
  'use strict';

  angular
    .module('app.core')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$httpParamSerializerJQLike', '$q', 'exception', 'logger'];
  /* @ngInject */
  function authentication($http, $httpParamSerializerJQLike, $q, exception, logger) {
    this.login = function login(loginData) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/user/auth',
        data: $httpParamSerializerJQLike(loginData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(success)
      .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for Login: ')({
          data: {
            description: e.data.error
          }
        });
      }
    }
  }
})();
