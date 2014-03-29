'use strict';

angular.module('taskulApp').factory('alertService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var alertService = {};

    // create an array of alerts available globally
    $rootScope.alerts = [];

    alertService.add = function(type, msg, timeout) {
      $rootScope.alerts.push({'type': type, 'msg': msg, 'close': function() {
        alertService.closeAlert(this);
      }});
      if (timeout) {
        $timeout(function(){
            alertService.closeAlert(this);
          }, timeout);
      }
    };

    alertService.closeAlertIdx = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    alertService.closeAlert = function (alert) {
        this.closeAlertIdx($rootScope.alerts.indexOf(alert));
      };
    alertService.clear = function() {
            $rootScope.alerts = [];
      };
    return alertService;
  }]);
