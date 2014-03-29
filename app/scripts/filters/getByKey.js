'use strict';

angular.module('taskulApp')

  /**
   *Search in a array ob object for a key
   */
  .filter('getByKey', function() {
  return function(input, key, value) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i][key] === value) {
        return {'index':i, 'value': input[i]};
      }
    }
    return null;
  };
});
