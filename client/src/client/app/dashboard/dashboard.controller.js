(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [getTasks()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getTasks() {
      return dataservice.getTasks().then(function(data) {
        vm.tasks = data;
        return vm.tasks;
      });
    }
  }
})();
