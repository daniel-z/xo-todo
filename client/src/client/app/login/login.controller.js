(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['dataservice', 'authentication', 'logger', '$state', 'md5', '$rootScope'];
  /* @ngInject */
  function LoginController(dataservice, authentication, logger, $state, md5, $rootScope) {
    var vm = this;
    vm.title = 'Login';
    vm.bigError = '';
    if ($state.params && $state.params.error) {
      vm.bigError = $state.params.error;
    }

    vm.loginData = {
      username: '',
      password: ''
    };

    activate();
    vm.cleanErrors = function cleanErrors () {
      vm.error = null;
    };

    function loginResponseHandler (response) {
      if (response && response.status && response.status === 'error') {
        vm.error = response.error;
        return;
      }
      $state.go('dashboard');
    }

    function login () {
      vm.cleanErrors();
      return authentication.login({
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
