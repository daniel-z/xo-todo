/* jshint -W079 */
var mockData = (function() {
  return {
    getMockTasks: getMockTasks,
    getMockStates: getMockStates
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
      open: [
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
      closed: [
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
})();
