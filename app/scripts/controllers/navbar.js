'use strict';

angular.module('taskulApp')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.isCollapsed = true;

    $scope.menu = [{
      'title': 'Tasks',
      'link': '/tasks'
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
