(function() {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.widgets',
    'app.dashboard',
    'app.layout',
    'app.login',
    'angular-md5'
  ]).run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        event.preventDefault();
        $state.go('login', {error: 'Please login first.'});
      }
    });
  });
})();
