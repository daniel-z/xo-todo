/* jshint -W117, -W030 */
describe('LoginController', function() {
  var controller;
  var loggedUser = mockData.getLoggedUser();
  var passwordMD5 = '5f4dcc3b5aa765d61d8327deb882cf99';
  beforeEach(function() {
    bard.appModule('app.login');
    bard.inject('$controller', '$q', 'dataservice', 'authentication', 'logger', '$state', 'md5', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('LoginController');
    sinon.stub(md5, 'createHash').returns(passwordMD5);
    $state.go = sinon.stub();
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
    });

    describe('login', function() {

      it('should call authentication with correct params', function() {
        var expectedData = {
          username: 'danielzm',
          password: 'password'
        };
        controller.loginData = expectedData;
        var authenticationLoginStub = sinon.stub(authentication, 'login').returns($q.when(loggedUser));
        controller.login();
        expect(authenticationLoginStub.called).to.be.true;
        expect(authenticationLoginStub.args[0][0].username).to.equals(expectedData.username);
        expect(authenticationLoginStub.args[0][0].password).to.equals(passwordMD5);
      });

      it('should redirect to dashboard on success', function() {
        var expectedData = {
          username: 'danielzm',
          password: 'password'
        };
        controller.loginData = expectedData;
        var authenticationLoginStub = sinon.stub(authentication, 'login').returns($q.when(loggedUser));
        controller.login().then(function () {
          expect($state.go.called).to.be.true;
          expect($state.go.args[0][0]).to.equals('dashboard');
        });
      });

      it('should log login errors to the user', function() {
          var response = {'status':'error','error':'Invalid username or password'};
          var authenticationLoginStub = sinon.stub(authentication, 'login').returns($q.when(response));
          controller.login().then(function () {
            expect(controller.error).to.equals(response.error);
          });
      });
    });

    describe('cleanErrors', function() {
      it('should clean errors', function() {
        controller.error = 'One error';
        controller.cleanErrors();
        expect(controller.error).to.be.null;
      });
    });

  });
});
