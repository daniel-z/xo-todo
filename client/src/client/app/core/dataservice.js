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
          {"_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"}},
          {"_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"}},
          {"_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"}},
          {"_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"}},
          {"_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description, todo description","status":"notCompleted","author":{"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"}}
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
