angular.module('beaconApp.controllers.aggiungidispositivo', [])
.controller('IoCtrl', function ($scope, Devices, $mdDialog) {
  $scope.ios = [];
  $scope.device = {};
  $scope.device.io = "input";
  $scope.device.type = "Pulsante";
  $scope.device.name = "";
  $scope.device.description = "";

  var getIos = function () {
    Devices.getIos().then(function(res){
      $scope.ios = res.data;
    }
  );
  };

  $scope.hide = function () {
    $mdDialog.hide();
  }
  $scope.add = function() {
    if (($scope.device.name === "") || ($scope.device.description === "") || ($scope.device.type === "") || ($scope.device.io === "")){
      alert = $mdDialog.alert()
           .title('Attenzione')
           .content('Per aggiunger un dispositivo devi compilare tutti i campi!')
           .ok('Chiudi');
           $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
    }
    else {
      Devices.add($scope.device).then(
        function(res) {
          $mdDialog.hide();
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
    getIos();
  })
