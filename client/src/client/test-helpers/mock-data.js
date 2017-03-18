/* jshint -W079 */
var mockData = (function() {
  return {
    getMockTasks: getMockTasks,
    getMockStates: getMockStates,
    updateTask: updateTask,
    getSingleTask: getSingleTask,
    getNewTask: getNewTask,
    getLoggedUser: getLoggedUser
  };

  function getMockStates() {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/dashboard.html',
          title: 'dashboard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }

  function getMockTasks() {
    var content = 'todo description, todo description, todo description, todo description todo '
      .concat('description, todo description, todo description, todo description, todo description');
    return {
      completed: [
        {
          '_id':'1','title':'Todo title',
          'description': content,
          'status':'notCompleted',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'2','title':'Todo title',
          'description': content,
          'status':'notCompleted',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'3','title':'Todo title',
          'description': content,
          'status':'notCompleted',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'4','title':'Todo title',
          'description': content,
          'status':'notCompleted',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'5','title':'Todo title',
          'description': content,
          'status':'notCompleted',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
      ],
      notCompleted: [
        {
          '_id':'6','title':'Todo title',
          'description': content,
          'status':'completed',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'7','title':'Todo title',
          'description': content,
          'status':'completed',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'8','title':'Todo title',
          'description': content,
          'status':'completed',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'9','title':'Todo title',
          'description': content,
          'status':'completed',
          'author':{
            '_id':'1', 'username':'ali'
          }
        },
        {
          '_id':'10','title':'Todo title',
          'description': content,
          'status':'completed',
          'author':{
            '_id':'1', 'username':'ali'
          }
        }]
      };
    }

  function updateTask () {
    return {
      'status':'success',
      'data':{
        '__v':'0','_id':'5757e6e41b0a244b256ac1d5',
        'title':'Todo title','description':'Todo description',
        'status':'completed',
        'author':'587c61662ee257006b150166'
      }
    }
  }

  function getSingleTask () {
    return {
      '_id':'5757e6e41b0a244b256ac1d5',
      'title':'Todo title',
      'description':'todo description',
      'status':'notCompleted',
      'author': {
        '_id':'5757e6e41b0a244b256ac1d5',
        'username':'ali'
      }
    };
  }

  function getNewTask () {
    return {
      'status':'success',
      'data': {
        '__v':'0',
        '_id':'5757e6e41b0a244b256ac1d5',
        'title':'Todo title',
        'description':'Todo description',
        'status':'completed',
        'author':'587c61662ee257006b150166'
      }
    };
  }
  function getLoggedUser () {
    return {'status':'success','sessionId':'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV','username':'ali'}
  }
})();
