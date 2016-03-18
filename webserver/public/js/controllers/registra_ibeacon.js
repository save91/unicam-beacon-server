
angular.module('beaconApp.controllers.registra_ibeacon', [])

.controller('RegistraiBeaconCtrl', function($scope, $rootScope, Devices, Beacons, beacon, $mdDialog) {
  $scope.beacon = {};
  $scope.beacon.properties = beacon;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };
  $scope.add  = function() {

    $scope.beacon.io = "null";
    $scope.beacon.type = "Beacon";
    Devices.add($scope.beacon).then(
      function(res) {
        Beacons.deleteBeacon(beacon);
        $mdDialog.hide();
      });
    };
  })
