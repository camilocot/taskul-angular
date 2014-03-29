'use strict';

angular.module('taskulApp')
  .factory('Task', function ($resource) {
    return $resource('/api/tasks/:id', {
      id: '@_id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      addComment: {
        method: 'POST',
        url: '/api/tasks/:id/comments',
        params: {id: '@task._id' }
      },
      deleteComment: {
        method: 'DELETE',
        url: '/api/tasks/:id/comments/:idcomment'
      }
    });
  });
