(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$rootScope', '$httpParamSerializerJQLike'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $rootScope, $httpParamSerializerJQLike) {
    var service = {
      getTasks: getTasks,
      updateTask: updateTask,
      addTask: addTask
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getTasks() {
      return $http.get('http://localhost:3000/todos?sessionId=' + $rootScope.currentUser.sessionId + '&skip=0&limit=10000')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTasks')(e);
      }
    }

    function updateTask (data) {
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/todo?sessionId=' + $rootScope.currentUser.sessionId,
        data: $httpParamSerializerJQLike(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(success)
      .catch(fail);

      function success(response) {
        return response.data.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTasks')(e);
      }
    }

    function addTask (data) {
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/todo?sessionId=' + $rootScope.currentUser.sessionId,
        data: $httpParamSerializerJQLike(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(success)
      .catch(fail);

      function success(response) {
        return response.data.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTasks')(e);
      }
    }
  }
})();
