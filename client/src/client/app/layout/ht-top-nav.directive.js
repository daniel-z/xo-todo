(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$scope', '$rootScope', 'authentication', '$state'];

    /* @ngInject */
    function TopNavController($scope, $rootScope, authentication, $state) {
      var vm = this;
      vm.user = {};
      vm.logout = function () {
        authentication.logout().then(function () {
          $state.go('login');
        });
      };
      $scope.$watch(function() {
        return $rootScope.currentUser;
      }, function() {
        vm.user = $rootScope.currentUser;
      }, true);

      $scope.isCollapsed = true;
    }

    return directive;
  }
})();
