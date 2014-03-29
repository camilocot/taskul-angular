'use strict';

angular.module('taskulApp')
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'task', function ($scope, $modalInstance, task) {
  $scope.task = task;

  $scope.ok = function () {
    $modalInstance.close($scope.task);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
