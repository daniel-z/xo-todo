(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger', 'authentication'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, authentication) {
    var vm = this;
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [getTasks()];
      return $q.all(promises).then(function() {
        filterTasks();
        logger.info('Activated Dashboard View');
      });
    }

    function filterTasks () {
      vm.completedTasks = filterByStatus('completed');
      vm.notCompletedTasks = filterByStatus('notCompleted');
    }

    function filterByStatus (status) {
      return vm.tasks.filter(function (task) {
        return task.status === status;
      });
    }

    vm.toggleEditForm = function toggleEditForm (id) {
      var selector = '#' + id;
      $(selector).find('.details').toggleClass('hidden');
      $(selector).find('.edit-form').toggleClass('hidden');
    };

    function getTasks() {
      return dataservice.getTasks().then(function(data) {
        vm.tasks = data;
      });
    }

    vm.saveTask = function (task) {
      var selector = '#'+task._id,
        title = $(selector).find('input.title').val(),
        description = $(selector).find('textarea.description').val(),
        data = {},
        currentUser = authentication.getLoggedUser();

      if (currentUser.username === task.author.username) {
        data.title = title;
        data.description = description;
      }

      dataservice.updateTask(data).then(function (newTask) {
        if (!newTask.errors) {
          vm.toggleEditForm(task._id);
          vm.updateTask(task, newTask);
          return;
        }
        logger.error('Task update error: ' + newTask.message);
      })
    };

    vm.updateTask = function (oldTask, newTask) {
      var oldTaskIndex = vm.tasks.map(function(task) { return task._id; }).indexOf(oldTask._id);
      // this is just an id, not needed
      delete newTask.author;
      angular.merge(vm.tasks[oldTaskIndex], newTask);
      filterTasks();
      return;
    };
  }
})();
