
angular.module('beaconApp.controllers.actions', [] )

.controller('ActionsCtrl', function($scope, Devices, GPIO, $mdDialog, mySocket) {
  $scope.devices = [];
  $scope.GPIOs = [];
  $scope.saveDevice = function(device) {
    Devices.editDevice(device);
  };

  var getGPIO = function() {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs = res.data;
      $scope.GPIOs.push({
        "_id":null,
        "type":"output",
        "GPIO":"Nessuno",
        "_Device":null,
        "value":0
      });
      $scope.GPIOs.push({
        "_id":null,
        "type":"input",
        "GPIO":"Nessuno",
        "_Device":null,
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
        "_id":null,
        "type":"Beacon",
        "io":"null",
        "name":"Nessuno"
      });
      $scope.devices.push({
        "_id":null,
        "type":"Lampada",
        "io":"output",
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

  mySocket.on('update:device', function() {
    getAll();
  });

  mySocket.on('put:gpio', function(data) {
    for(var i = 0; i < $scope.GPIOs.length; i++) {
      if($scope.GPIOs[i]._id === data._id ) {
        $scope.GPIOs[i].value = data.value;
        i = $scope.GPIOs.length;
      }
    }
  });

  getAll();
  getGPIO();
});
