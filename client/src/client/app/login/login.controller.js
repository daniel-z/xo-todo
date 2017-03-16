(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function LoginController($q, dataservice, logger) {
    var vm = this;
    vm.title = 'Login';

    activate();

    function assignCurrentUser (user) {
      $rootScope.currentUser = user;
      return user;
    }

    function activate() {
      logger.info('Activated Login');
    }
  }
})();
