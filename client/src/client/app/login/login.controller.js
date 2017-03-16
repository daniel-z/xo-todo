(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', 'dataservice', 'authentication', 'logger', '$state'];
  /* @ngInject */
  function LoginController($q, dataservice, authentication, logger, $state) {
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

    function assignCurrentUser (user) {
      console.log(user);
      // $rootScope.currentUser = user;
      // return user;
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
      authentication.login(vm.loginData).then(loginResponseHandler);
    }

    vm.login = login;

    function activate() {
      logger.info('Activated Login');
    }
  }
})();
