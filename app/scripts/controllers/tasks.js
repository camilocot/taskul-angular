'use strict';

angular.module('taskulApp')
    .controller('TasksCtrl', ['$scope', '$filter', '$location','Task', '$modal', function ($scope, $filter, $location, Task, $modal) {

        $scope.tasks = Task.query();

        $scope.task = { title: '', content: ''};

        $scope.submitTask = function () {
            Task.save($scope.task, function (ref) {
              $scope.tasks.push(ref);
              $scope.task = { title: '', content: ''};
              $location.path('/tasks/' + ref._id);
            });
          };

        $scope.deleteTask = function (taskId) {
            Task.remove({'id': taskId}, function(){
                var found = $filter('getByKey')($scope.tasks, '_id', taskId);
                $scope.tasks.splice(found.index, 1);
              });
          };


        $scope.openModalTask = function () {
          var modalInstance = $modal.open({
            templateUrl: 'partials/modals/task',
            controller: 'ModalInstanceCtrl',
            resolve: {
              task: function () {
                return $scope.task;
              }
            }
          });

          modalInstance.result.then(function (task) {
            $scope.task = task;
            console.log(task);
            $scope.submitTask();
          }, function () {
          });
        };
      }]);
