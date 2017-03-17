/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var tasks = mockData.getMockTasks();
  var updatedTask = mockData.updateTask();
  var singleTask = mockData.getSingleTask();

  beforeEach(function() {
    bard.appModule('app.dashboard');
    bard.inject('$controller', '$q', '$rootScope', 'dataservice', 'logger', 'authentication');
  });

  beforeEach(function() {
    sinon.stub(dataservice, 'getTasks').returns($q.when(tasks));
    sinon.stub(dataservice, 'updateTask').returns($q.when(updatedTask));
    controller = $controller('DashboardController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have 5 tasks completed and 5 notCompleted', function() {
        expect(controller.tasks).to.have.property('completed').with.lengthOf(5);
        expect(controller.tasks).to.have.property('notCompleted').with.lengthOf(5);
      });
    });

    describe('on update', function() {
      it('should call dataservice update task', function() {
        controller.updateTask(singleTask);
        expect(dataservice.updateTask.called).to.be.true;
      });
      it.only('should call dataservice update task with task parameters', function() {
        var expected = {
          title: 'my task',
          description: 'my task',
          id: singleTask._id,
          status: singleTask.status
        };
        var element = '<div id="'+singleTask._id+'">'+
          '<input type="text" class="title style="display:none;" hidden" value="'+ expected.title +'">'+
          '<textarea class="description" style="display:none;" value="my task">'+ expected.description +'</textarea>'+
        '</div>';
        $('body').append(angular.element(element));
        controller.updateTask(singleTask);
        var arguments = dataservice.updateTask.args[0][0];
        expect(arguments.title).to.equal(expected.title);
        expect(arguments.description).to.equal(expected.description);
        expect(arguments.id).to.equal(expected.id);
        expect(arguments.status).to.equal(expected.status);
      });
    });

  });
});
