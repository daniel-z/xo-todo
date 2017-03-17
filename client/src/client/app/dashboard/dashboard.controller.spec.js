/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var tasks = mockData.getMockTasks();
  var updatedTask = mockData.updateTask();

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
      // it('should have logged "Activated"', function() {
      //   expect($log.info.logs).to.match(/Activated/);
      // });

      it('should have 5 tasks completed and 5 notCompleted', function() {
        expect(controller.tasks).to.have.property('completed').with.lengthOf(5);
        expect(controller.tasks).to.have.property('notCompleted').with.lengthOf(5);
      });
    });
  });
});
