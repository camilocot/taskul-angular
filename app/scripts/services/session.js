'use strict';

angular.module('taskulApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
