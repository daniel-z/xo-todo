(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', 'dataservice', 'authentication', 'logger', '$state', 'md5', '$rootScope'];
  /* @ngInject */
  function LoginController($q, dataservice, authentication, logger, $state, md5, $rootScope) {
    var vm = this;
    vm.title = 'Login';
    vm.bigError = $state.params.error;
    vm.loginData = {
      username: '',
      password: ''
    }

    activate();
    vm.cleanErrors = function cleanErrors () {
      vm.error = null;
    };

    function assignCurrentUser (response) {
      $rootScope.currentUser = {
        sessionId: response.sessionId,
        username: response.username
      };
      $state.go('dashboard');
    }

    function loginResponseHandler (response) {
      if (response && response.status && response.status === 'error') {
        vm.error = response.error;
        return;
      }
      assignCurrentUser(response);
    }

    function login () {
      vm.cleanErrors();
      authentication.login({
        username: vm.loginData.username,
        password: md5.createHash(vm.loginData.password)
      }).then(loginResponseHandler);
    }

    vm.login = login;

    function activate() {
      logger.info('Activated Login');
    }
  }
})();
