angular.module('beaconApp.controllers.aggiungidispositivo', [])
.controller('IoCtrl', function ($scope, Devices, $mdDialog) {
  $scope.ios = [{
    name: "uno",
    type: "input"
  }];
  $scope.device = {};
  $scope.device.io = "input";
  $scope.device.type = "Pulsante";
  $scope.device.name = "";
  $scope.device.description = "";


  $scope.hide = function () {
    $mdDialog.hide();
  }
  $scope.add = function() {
    if (($scope.device.name === "") || ($scope.device.description === "") || ($scope.device.type === "") || ($scope.device.io === "")){
      alert ("inserire tutti i campi");
    }
    else {
    Devices.add($scope.device).then(
      function(res) {
        $mdDialog.hide();
      },
      function (res) {
        alert(res.data);
      },
      function(res) {
        $scope.
        $scope.device.io = "input";
        $scope.device.type = "Pulsante";
        $scope.device.name = "";
        $scope.device.description = "";

      });
    }
  }
  })
