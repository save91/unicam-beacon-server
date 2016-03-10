angular.module('beaconApp.controllers.aggiungidispositivo', [])
.controller('IoCtrl', function ($scope, Devices) {
  $scope.ios = [{
    name: "uno",
    type: "input"
  }];
  $scope.add = function() {
    Devices.add($scope.device).then(
      function(res) {

      },
      function (res) {
        alert (res.data);
      },
      function(res) {

        $scope.device.io = "input";
        $scope.device.type = "Pulsante";
        $scope.device.name = "";
        $scope.device.description = "";

      });
    }
  })
