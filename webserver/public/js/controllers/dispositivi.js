
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DevicesCtrl', function($scope, $mdDialog, Beacons, Devices, $mdBottomSheet) {
  $scope.beacons = [];
  $scope.ios = [];
  $scope.device = {
    io: "input",
    properties: null,
    type: "Pulsante"
  };
  var getIos = function () {
    $scope.ios = [{
        name: "uno",
        type: "input"
    }];
  };

  var updateDevices = function () {
    Devices.getAll().then(function(res) {
      $scope.devices= res.data;
    },
    function (res) {
      alert (res.data);
    }
  );
};

var updateBeacons = function() {
  Beacons.getAll().then(function(res){
    $scope.beacons = res.data;
  },
  function(res) {
    alert (res.data);
  });
}




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
      alert (res.data);
    }
  );
};


$scope.showAdd = function(ev) {
  $mdDialog.show({
     controller: 'IoCtrl',
     templateUrl: 'templates/aggiungidispositivo.html',

     targetEvent: ev,
   })
   .then(function(answer) {
     $scope.alert = 'You said the information was "' + answer + '".';
   }, function() {
     $scope.alert = 'You cancelled the dialog.';
   })
 };

updateDevices();
updateBeacons();
getIos();


});
