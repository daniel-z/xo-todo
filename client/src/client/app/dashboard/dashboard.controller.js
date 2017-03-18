(function() {
  'use strict';
  /* global $ */
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['dataservice', 'logger', 'authentication'];
  /* @ngInject */
  function DashboardController(dataservice, logger, authentication) {
    var vm = this;
    vm.currentUser = authentication.getLoggedUser();

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
      if (!vm.tasks || !vm.tasks.filter) {
        return;
      }
      return vm.tasks.filter(function (task) {
        return task.status === status;
      });
    }

    function getTasks() {
      return dataservice.getTasks().then(function(data) {
        vm.tasks = data;
        filterTasks();
      });
    }

    // ---------------------------------------------
    // Update Task
    // ---------------------------------------------
    vm.toggleEditForm = function toggleEditForm (task) {
      if (vm.currentUser.username !== task.author.username) {
        logger.warning('You are not allowed to edit this task details.');
        return;
      }

      var selector = '#' + task._id;
      $(selector).find('.details').toggleClass('hidden');
      $(selector).find('.edit-form').toggleClass('hidden');
    };

    vm.updateTask = function (task) {
      var selector = '#'+task._id,
        data = {
          id: task._id,
          title: $(selector).find('input.title').val(),
          description: $(selector).find('textarea.description').val(),
          status: task.status
        };

      return dataservice.updateTask(data).then(function (newTask) {
        if (newTask.errors) {
          logger.error('Task update error: ' + newTask.message);
          return;
        }
        vm.toggleEditForm(task);
        getTasks();
        logger.info('Task "' + task.title + '" updated successfully.');
      });
    };

    // ---------------------------------------------
    // Add Task
    // ---------------------------------------------
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
      function addNewTaskHandler (response) {
        if (response.errors) {
          logger.error('Error adding new task "' + vm.addtask.title + '".');
        }

        getTasks();
        logger.info('Task "' + vm.addtask.title + '" added successfully.');
        vm.toggleAddTaskForm ();
        vm.addtask = {};
      }
      return dataservice.addTask(vm.addtask).then(addNewTaskHandler);
    };

    // ---------------------------------------------
    // Delete Task
    // ---------------------------------------------

    vm.deleteTask = function addNewTask (task) {
      function deleteTaskHandler (response) {
        if (response.errors) {
          logger.error('Error deleting Task: "' + task.title + '".');
        } else {
          logger.info('Task "' + task.title + '" deleted successfully.');
          getTasks();
        }
      }
      return dataservice.deleteTask({id: task._id}).then(deleteTaskHandler);
    };

    vm.dragTask = function dragTask (event) {
      event.dataTransfer.setData('id', event.target.id);
      event.dataTransfer.setData('status', $(event.target).data('status'));
    };

    vm.allowDrop = function (event) {
      event.preventDefault();
    };

    vm.dropTask = function dropTask (event) {
      event.preventDefault();
      var id = event.dataTransfer.getData('id'),
        status = event.dataTransfer.getData('status'),
        newStatus = $(event.target).closest('.widget').data('tasks-status');
        if (status !== newStatus) {
          updateTaskStatus(id, newStatus);
        }
    };

    function getTaskById (id) {
      if (!id) {
        return;
      }
      var index = vm.tasks.map(function (task) { return task._id; }).indexOf(id);
      return vm.tasks[index];
    }

    function updateTaskStatus (id, newStatus) {
      var task = getTaskById(id),
      data = {
        id: task._id,
        status: newStatus
      };
      dataservice.updateTask(data).then(updateTaskHandler);
      function updateTaskHandler (response) {
        if (response.errors) {
          return;
        }
        getTasks();
        logger.info('Task' + task.title + ' changed to status "' + newStatus + '" successfully.');
      }
    }
  }
})();
