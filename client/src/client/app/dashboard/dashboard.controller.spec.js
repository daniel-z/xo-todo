/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var tasks = mockData.getMockTasks();

  beforeEach(function() {
    bard.appModule('app.dashboard');
    bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
  });

  beforeEach(function() {
    sinon.stub(dataservice, 'getTasks').returns($q.when(tasks));
    controller = $controller('DashboardController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Dashboard', function() {
        expect(controller.title).to.equal('Dashboard');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have 5 tasks completed and 5 notCompleted', function() {
        expect(controller.tasks).to.have.property('completed').with.lengthOf(5);
        expect(controller.tasks).to.have.property('notCompleted').with.lengthOf(5);
      });
    });
  });
});
