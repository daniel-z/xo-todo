(function() {
  'use strict';

  angular.module('app', [
    'ngCookies',
    'angular-md5',
    'app.core',
    'app.widgets',
    'app.dashboard',
    'app.layout',
    'app.login'
  ])
  .run(function ($rootScope, $cookies) {
      if ($cookies.get('currentUser.username') && $cookies.get('currentUser.sessionId')) {
        $rootScope.currentUser = {};
        $rootScope.currentUser.username = $cookies.get('currentUser.username');
        $rootScope.currentUser.sessionId = $cookies.get('currentUser.sessionId');
      }
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        event.preventDefault();
        $state.go('login', {error: 'Please login first.'});
      }
    });
  });
})();
