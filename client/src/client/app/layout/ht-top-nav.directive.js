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

    TopNavController.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function TopNavController($scope, $rootScope) {
      var vm = this;
      vm.user = {};

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
