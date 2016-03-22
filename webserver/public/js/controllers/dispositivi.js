
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DevicesCtrl', function($scope, $mdDialog, Beacons, Devices) {
  $scope.beacons = [];
  $scope.ios = [];
  $scope.device = [];

var updateDevices = function () {
  Devices.getAll().then(function(res) {
    $scope.devices= res.data;
  },
  function (res) {
    alert = $mdDialog.alert()
         .title('Attenzione')
         .content("non c'è la connessione al server")
         .ok('Chiudi');
         $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
  }
);
};

var updateBeacons = function() {
  Beacons.getAll().then(function(res){
    $scope.beacons = res.data;
  },
  function(res) {
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
}
$scope.add  = function() {
  Devices.add($scope.device).then(
    function(res) {
      updateDevices();
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
    }
  );
  $scope.device.io = "input";
  $scope.device.type = "Pulsante";
  $scope.device.name = "";
  $scope.device.description = "";
}

$scope.getAll = function() {
  updateBeacons();
};

$scope.updateDevices = function() {
  updateDevices();
};

$scope.deleteBeacon = function(beacon) {
  Beacons.deleteBeacon(beacon).then(function(res){
    updateBeacons();
  },
  function(res){
    alert (res.data);
  });
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
  );
};
$scope.showAdd1 = function(beacon, ev) {
  $mdDialog.show({
    controller : 'RegistraiBeaconCtrl',
    templateUrl: 'templates/registra_ibeacon.html',
    locals: {
      beacon: beacon
    },
    targetEvent: ev,
  })
  .finally(function() {
    updateDevices();
    updateBeacons();
  });
};

$scope.showAdd = function(ev) {
  $mdDialog.show({
    controller: 'IoCtrl',
    templateUrl: 'templates/aggiungidispositivo.html',

    targetEvent: ev,
  })
  .finally(function() {
    updateDevices();
  });
};

updateDevices();
updateBeacons();
});
