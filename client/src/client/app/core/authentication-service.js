(function() {
  'use strict';

  angular
    .module('app.core')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$httpParamSerializerJQLike', '$q', 'exception', 'logger', '$cookies', '$rootScope'];
  /* @ngInject */
  function authentication($http, $httpParamSerializerJQLike, $q, exception, logger, $cookies, $rootScope) {
    this.login = function login(loginData) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/user/auth',
        data: $httpParamSerializerJQLike(loginData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(success)
      .catch(fail);
    };

    function success(response) {
      saveLoggedUser(response.data);
      return response.data;
    }

    function fail(e) {
      return exception.catcher('XHR Failed for authentication: ')({
        data: {
          description: e.data.error
        }
      });
    }

    function saveLoggedUser (response) {
      $cookies.put('currentUser.username', response.username);
      $cookies.put('currentUser.sessionId', response.sessionId);
      $rootScope.currentUser = {
        sessionId: response.sessionId,
        username: response.username
      };
    }

    this.getLoggedUser = function getLoggedUser () {
      return {
        username: $cookies.get('currentUser.username'),
        sessionId: $cookies.get('currentUser.sessionId')
      };
    };

    this.logout = function login() {
      var sessionId = this.getLoggedUser().sessionId;
      if (!sessionId) {
        return;
      }
      return $http.get('http://localhost:3000/user/logout?sessionId=' + sessionId)
        .then(success, fail);
    }
  }
})();
