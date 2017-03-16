/* jshint -W117, -W030 */
describe('LoginController', function() {
  var controller;
  // var tasks = mockData.getMockTasks();

  beforeEach(function() {
    bard.appModule('app.login');
    bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
  });

  beforeEach(function() {
    // sinon.stub(dataservice, 'getTasks').returns($q.when(tasks));
    controller = $controller('LoginController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Login controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Login', function() {
        expect(controller.title).to.equal('Login');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
