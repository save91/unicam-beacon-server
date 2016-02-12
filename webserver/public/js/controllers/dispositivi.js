
angular.module('beaconApp.controllers.dispositivi', [])

.controller('DispositiviCtrl', function($scope, Beacons, Dispositivi) {
  $scope.bloccato = true;
  $scope.dispositivo = {
    io: "input"
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
        $scope.dispositivi = [];
        alert("Impossibile scaricare l'elenco dei dispositivi");
      } else {
        $scope.ios = risposta.io;
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
  $scope.ios = Dispositivi.getIO().then(callbackIO);

  $scope.aggiungi  = function() {
    Dispositivi.aggiungi($scope.dispositivo).then(callbackUpdateDispositivi);
    $scope.dispositivo.io = "input";
    $scope.dispositivo.nome = "";
    $scope.dispositivo.descrizione = "";
  }

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
