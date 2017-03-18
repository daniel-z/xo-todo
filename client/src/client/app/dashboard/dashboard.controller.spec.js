/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var tasks = mockData.getMockTasks();
  var updatedTask = mockData.updateTask();
  var singleTask = mockData.getSingleTask();
  var newTask = mockData.getNewTask();

  beforeEach(function() {
    bard.appModule('app.dashboard');
    bard.inject('$controller', '$q', '$rootScope', 'dataservice', 'logger', 'authentication');
  });

  beforeEach(function() {
    sinon.stub(dataservice, 'getTasks').returns($q.when(tasks));
    sinon.stub(dataservice, 'updateTask').returns($q.when(tasks));
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
    sinon.stub(logger, 'warning');
    controller = $controller('DashboardController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  function injectTaskEditForm (task) {
    var element = '<div id="'+task._id+'" class="edit-form hidden">'+
      '<div class="details"></div>'+
      '<div class="edit-form hidden">'+
        '<input type="text" class="title" style="display:none;" value="'+ task.title +'">'+
        '<textarea class="description" style="display:none;" value="my task">'+ task.description +'</textarea>'+
      '</div>'+
    '</div>';
    $('body').append(angular.element(element));
  }

  function removeTaskEditForm () {
    $('#'+singleTask._id).remove();
  }


  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

  // --------------
  // activate
  // --------------
  describe('after activate', function() {
    it('should have 5 tasks completed and 5 notCompleted', function() {
      expect(controller.tasks).to.have.property('completed').with.lengthOf(5);
      expect(controller.tasks).to.have.property('notCompleted').with.lengthOf(5);
    });
  });

  // --------------
  // toggleEditForm
  // --------------
  describe('on toggleEditForm', function() {
    it('should not enable form if current user is not the user of the task', function () {
      controller.currentUser.username = 'danielz';
      injectTaskEditForm(singleTask);
      controller.toggleEditForm(singleTask);
      expect($('#'+singleTask._id).find('.edit-form').hasClass('hidden')).to.be.true;
      expect($('#'+singleTask._id).find('.details').hasClass('hidden')).to.be.false;
      removeTaskEditForm(singleTask);
    });

    it('should log if current user is not the user of the task', function () {
      controller.currentUser.username = 'danielz';
      injectTaskEditForm(singleTask);
      controller.toggleEditForm(singleTask);
      expect(logger.warning.called).to.be.true;
      removeTaskEditForm(singleTask);
    });
    // it('',function () {});
  });

  // --------------
  // updateTask
  // --------------
  describe('on updateTask', function() {
    var expected = {
      title: 'my task',
      description: 'my task',
      id: singleTask._id,
      status: singleTask.status
    };

    beforeEach(function() {
      var element = '<div id="'+singleTask._id+'">'+
        '<input type="text" class="title" style="display:none;" value="'+ expected.title +'">'+
        '<textarea class="description" style="display:none;" value="my task">'+ expected.description +'</textarea>'+
      '</div>';
      $('body').append(angular.element(element));
    });

    afterEach(function () {
      removeTaskEditForm();
    });

    it('should call dataservice update task', function() {
      controller.updateTask(singleTask);
      expect(dataservice.updateTask.called).to.be.true;
    });

    it('should call dataservice update task with correct task parameters', function() {
      controller.updateTask(singleTask);
      var args = dataservice.updateTask.args[0][0];
      expect(args.title).to.equal(expected.title);
      expect(args.description).to.equal(expected.description);
      expect(args.id).to.equal(expected.id);
      expect(args.status).to.equal(expected.status);
    });

    it('should update tasks after edit', function() {
      controller.tasks = {};
      expect(controller.tasks.completed).to.be.undefined;
      expect(controller.tasks.notCompleted).to.be.undefined;
      controller.updateTask(singleTask).then(function () {
        expect(controller.tasks.completed.length).to.equal(5);
        expect(controller.tasks.notCompleted.length).to.equal(5);
      });
    });

    it('should turn off edit form', function() {
      // execute function that injects edit form with task id visible
      controller.updateTask(singleTask).then(function () {
        // search that form and expect it to have class hidden true
        expect(controller.tasks.completed.length).to.equal(5);
      });
      // execute function that removes edit form with task id
    });

    it('should log to the user on success', function() {
      controller.updateTask(singleTask).then(function () {
        expect(logger.info.called).to.be.true;
      });
    });

    it('should call toggle edit form function', function() {
      dataservice.updateTask.returns($q.when(singleTask));
      var toggleEditForm = sinon.stub(controller,'toggleEditForm');
      controller.updateTask(singleTask).then(function () {
        expect(toggleEditForm.called).to.be.true;
      });
      toggleEditForm.reset();
      toggleEditForm.resetBehavior();
    });
  });

  // --------------
  // addNewTask
  // --------------
  describe('on addNewTask', function() {

    it('should send correct params', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        var args = addTaskStub.args[0][0];
        expect(args.title).to.equal(expectedData.title);
        expect(args.description).to.equal(expectedData.description);
        expect(args.status).to.equal(expectedData.status);
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should get new tasks', function () {
      controller.tasks = {};
      expect(controller.tasks.completed).to.be.undefined;
      expect(controller.tasks.notCompleted).to.be.undefined;

      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(controller.tasks.completed.length).to.equal(5);
        expect(controller.tasks.notCompleted.length).to.equal(5);
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should log to the user on success', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(logger.info.called).to.be.true;
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should log to the user on error', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when({errors: []}));
      expectedData = {};
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(logger.error.called).to.be.true;
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });
  });
  // --------------
  // addNewTask
  // --------------
  describe('on addNewTask', function() {

    it('should send correct params', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        var args = addTaskStub.args[0][0];
        expect(args.title).to.equal(expectedData.title);
        expect(args.description).to.equal(expectedData.description);
        expect(args.status).to.equal(expectedData.status);
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should get new tasks', function () {
      controller.tasks = {};
      expect(controller.tasks.completed).to.be.undefined;
      expect(controller.tasks.notCompleted).to.be.undefined;

      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(controller.tasks.completed.length).to.equal(5);
        expect(controller.tasks.notCompleted.length).to.equal(5);
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should log to the user on success', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when(newTask));
      expectedData = {
        title: 'danielzm task',
        description: 'This is my task.',
        status: 'notCompleted'
      };
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(logger.info.called).to.be.true;
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });

    it('should log to the user on error', function () {
      var addTaskStub = sinon.stub(dataservice,'addTask').returns($q.when({errors: []}));
      expectedData = {};
      controller.addtask = expectedData;
      controller.addNewTask().then(function () {
        expect(logger.error.called).to.be.true;
        addTaskStub.reset();
        addTaskStub.resetBehavior();
      });
    });
  });

  // --------------
  // drag functions
  // --------------
  describe('on dragTask', function() {
    it('should set the correct params', function () {
      var id = '1234',
      status = 'notCompleted',
      element = angular.element('<div id="'+ id +'" data-status="'+ status +'"></div>')[0],
      event = {
        dataTransfer: {
          setData: function(){},
        },
        target: element
      };
      var setDataStub = sinon.stub(event.dataTransfer, 'setData');
      controller.dragTask(event);
      // first call arguments
      expect(setDataStub.args[0][0]).to.equal('id');
      expect(setDataStub.args[0][1]).to.equal(id);
      // second call arguments
      expect(setDataStub.args[1][0]).to.equal('status');
      expect(setDataStub.args[1][1]).to.equal(status);
    });
  });
  describe('on allowDrop', function() {
    it('should stop default behavior', function () {
      var event = {preventDefault: sinon.stub()};
      controller.allowDrop(event);
      // first call arguments
      expect(event.preventDefault.called).to.be.true;
    });
  });


});
