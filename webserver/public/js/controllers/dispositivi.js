
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DevicesCtrl', function($scope, Beacons, Devices) {
  $scope.bloccato = true;
  $scope.device = {
    io: "input",
    properties: null,
    type: "Pulsante"
  };
  var callbackUpdateiBeacons = function(risposta) {
    $scope.bloccato = false;
    if(risposta.status === 0) {
      $scope.beacons = [];
      alert("Impossibile scaricare l'elenco dei beacons");
    } else {
      $scope.beacons = risposta.beacons;
    }
  };

  var callbackIO = function(risposta) {
    $scope.bloccato = false;
    if(risposta.status === 0) {
      $scope.devices = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      $scope.ios = risposta.io;
    }
  };
  $scope.beacons = Beacons.getAll().then(callbackUpdateiBeacons);
  var updateDevices = function () {
    Devices.getAll().then(function(res) {
      $scope.devices= res.data;
    },
    function (res) {
      alert (res.data);
    }
  );
}

updateDevices();

$scope.ios = [];

$scope.add  = function() {
  Devices.add($scope.device).then(
    function(res) {
      updateDevices();
    },
    function (res) {
      alert (res.data);
    }
  );
  $scope.device.io = "input";
  $scope.device.type = "Pulsante";
  $scope.device.name = "";
  $scope.device.description = "";
}

$scope.aggiornaiBeacons = function() {
  $scope.bloccato = true;
  Beacons.getAll().then(callbackUpdateiBeacons);
};

$scope.aggiornaDispositivi = function() {
  $scope.bloccato = true;
  updateDevices();
};

$scope.eliminaBeacon = function(id) {
  Beacons.eliminaBeacon(id).then(callbackUpdateiBeacons);
};

$scope.cambia_tipo = function() {
  if($scope.dispositivo.io === "input") {
    $scope.dispositivo.type = "Pulsante";
  }else {
    $scope.dispositivo.type = "Cancello";
  }
};

$scope.deleteDevice = function(device) {
  Devices.deleteDevice(device).then(
    function(res){
      updateDevices();
    },
    function (res){
      alert (res.data);
    }
  );
};
});
