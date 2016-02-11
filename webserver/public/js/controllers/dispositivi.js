
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DispositiviCtrl', function($scope, Beacons, Dispositivi) {
  $scope.bloccato = true;
  var callbackUpdateiBeacons = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        $scope.beacons = [];
        alert("Impossibile scaricare l'elenco dei beacons");
      } else {
        $scope.beacons = risposta.beacons;
      }
  };

  var callbackUpdateDispositivi = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        $scope.dispositivi = [];
        alert("Impossibile scaricare l'elenco dei dispositivi");
      } else {
        $scope.dispositivi = risposta.dispositivi;
      }
  };

  $scope.beacons = Beacons.getAll().then(callbackUpdateiBeacons);
  $scope.dispositivi = Dispositivi.getAll().then(callbackUpdateDispositivi);

  $scope.aggiornaiBeacons = function() {
    $scope.bloccato = true;
    Beacons.getAll().then(callbackUpdateiBeacons);
  };

  $scope.aggiornaDispositivi = function() {
    $scope.bloccato = true;
    Dispositivi.getAll().then(callbackUpdateDispositivi);
  };

  $scope.eliminaBeacon = function(id) {
    Beacons.eliminaBeacon(id).then(callbackUpdateiBeacons);
  };
})
