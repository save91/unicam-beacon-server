
angular.module('beaconApp.controllers.operazioni', [] )

.controller('OperazioniCtrl', function($scope, Devices, GPIO, $mdDialog) {
  $scope.devices = [];
  $scope.GPIOs = [];
  $scope.saveDevice = function(device) {
    Devices.editDevice(device);
  };

  var getGPIO = function() {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs = res.data;
      $scope.GPIOs.push({
        "id":0,
        "type":"output",
        "GPIO":"Nessuno",
        "id_device":0,
        "state":0,
        "value":0
      });
    },
    function (res) {
      alert = $mdDialog.alert()
      .title('Attenzione')
      .content(res.data)
      .ok('Chiudi');
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
    });
  };

  var getAll = function () {
    Devices.getAll().then(function(res){
      $scope.devices = res.data;
      $scope.devices.push({
        "id":0,
        "type":"ibeacon",
        "io":"null",
        "name":"Nessuno"
      });
    },
    function(res){
      alert = $mdDialog.alert()
      .title('Attenzione')
      .content(res.data)
      .ok('Chiudi');
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
    }
  )};
  getAll();
  getGPIO();
});
