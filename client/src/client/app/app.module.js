(function() {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.widgets',
    'app.dashboard',
    'app.layout',
    'app.login'
  ]).run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        event.preventDefault();
        console.log('Needs Login!!!');
      }
    });
  });
})();
