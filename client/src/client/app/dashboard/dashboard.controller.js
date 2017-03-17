(function($) {
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
      getTasks();
      // logger.info('Activated Dashboard View');
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

    vm.toggleEditForm = function toggleEditForm (task) {
      var currentUser = authentication.getLoggedUser();
      if (currentUser.username != task.author.username) {
        logger.warning('You are not allowed to edit this task details.');
        return;
      }

      var selector = '#' + task._id;
      $(selector).find('.details').toggleClass('hidden');
      $(selector).find('.edit-form').toggleClass('hidden');
    };

    function getTasks() {
      return dataservice.getTasks().then(function(data) {
        vm.tasks = data;
        filterTasks();
      });
    }

    vm.updateTask = function (task) {
      var selector = '#'+task._id,
        data = {
          id: task._id,
          title: $(selector).find('input.title').val(),
          description: $(selector).find('textarea.description').val(),
          status: task.status
        },
        currentUser = authentication.getLoggedUser();

      dataservice.updateTask(data).then(function (newTask) {
        if (newTask.errors) {
          logger.error('Task update error: ' + newTask.message);
          return;
        }
        vm.toggleEditForm(task);
        getTasks();
      });
    };

    vm.addtask = {
      title: '',
      description: '',
      status: 'notCompleted'
    };

    vm.toggleAddTaskForm = function toggleAddTaskForm () {
      $('#add-task').toggleClass('hidden');
      $('.add-task-btn').toggleClass('hidden');
    };

    vm.addNewTask = function addNewTask () {
      dataservice.addTask(vm.addtask).then(addNewTaskHandler);
      function addNewTaskHandler (response) {
        if (!response.errors) {
          getTasks();
        }
      }
    };

  }
})($);
