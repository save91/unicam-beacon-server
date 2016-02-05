
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DispositiviCtrl', function($scope, Beacons) {
  $scope.bloccato = true;
  var callbackUpdate = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        $scope.beacons = [];
        alert("Impossibile scaricare l'elenco dei beacons");
      } else {
        $scope.beacons = risposta.beacons;
      }
  };
  $scope.beacons = Beacons.getAll(callbackUpdate);

  $scope.aggiorna = function() {
    $scope.bloccato = true;
    Beacons.getAll(callbackUpdate);
  };
})
