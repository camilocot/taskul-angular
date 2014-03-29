'use strict';

angular.module('taskulApp')
.controller('TaskViewCtrl',  ['$scope', '$routeParams', 'Task', '$filter', 'alertService', function ($scope, $routeParams, Task, $filter, alertService) {
    $scope.task = $scope.task = Task.get({'id':$routeParams.taskId}, function (ref) {
      if(typeof ref.comments === 'undefined' ) {
        ref.comments = [];
        console.log(ref.comments);
      }
    });

    $scope.addComment = function () {
        Task.addComment({'task': $scope.task, 'comment': $scope.comment}, function (ref) {
          $scope.comment.content = '';
          $scope.task = ref;
          // $location.path('/tasks/' + ref._id);
        }, function (ref) {
          alertService.add('warning',ref,5000);
        });

      };
    $scope.deleteComment = function (commentId) {
        var found = $filter('getByKey')($scope.task.comments, '_id', commentId);
        console.log(found.value);
        Task.deleteComment({'id': $scope.task._id, 'idcomment':found.value._id}, function (ref) {
          $scope.task = ref;
          // $location.path('/tasks/' + ref._id);
        });
      };
  }]);
