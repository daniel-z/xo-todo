(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getTasks: getTasks
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getTasks() {
      return $http.get('/api/people')
        .then(fakeSuccess)
        // .then(success)
        .catch(fail);

      function fakeSuccess () {
        var data = {"status":"success","data":[
          {"_id":"1","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"1", "username":"ali"}},
          {"_id":"2","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"1", "username":"ali"}},
          {"_id":"3","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"1", "username":"ali"}},
          {"_id":"4","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"1", "username":"ali"}},
          {"_id":"5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"1", "username":"ali"}},

          {"_id":"6","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"completed","author":{"_id":"1", "username":"ali"}},
          {"_id":"7","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"completed","author":{"_id":"1", "username":"ali"}},
          {"_id":"8","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"completed","author":{"_id":"1", "username":"ali"}},
          {"_id":"9","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"completed","author":{"_id":"1", "username":"ali"}},
          {"_id":"10","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"completed","author":{"_id":"1", "username":"ali"}}
        ]}
        return data.data;
      }

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTasks')(e);
      }
    }
  }
})();
