
angular.module('beaconApp.controllers.operazioni', [] )

.controller('OperazioniCtrl', function($scope, Dispositivi, GPIO, search) {
  $scope.self = search;
  $scope.dispositivi = [];
  $scope.GPIOs = [];

  var callbackGPIO = function(risposta) {
    if(risposta.status === 0) {
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei GPIO");
    } else {
      $scope.GPIOs = risposta.gpio;
      $scope.GPIOs.push({id:0, tipo: "output", id_dispositivo:0 , GPIO:"Nessuno"});
    }
  };

  var callbackDispositivi = function(risposta) {
    if(risposta.status === 0) {
      $scope.dispositivi = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      $scope.dispositivi = risposta.dispositivi;
      $scope.dispositivi.push({id:0, nome:"Nessuno", io:null, type:"iBeacon"});
    }
  };

  var callback = function(risposta) {
    if(risposta.status === 0) {
      $scope.dispositivi = [];
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      GPIO.getGPIO().then(callbackGPIO);
      Dispositivi.getAll().then(callbackDispositivi);
    }
  };

  Dispositivi.getAll().then(callbackDispositivi);
  GPIO.getGPIO().then(callbackGPIO);

  $scope.cambiaBeacon = function(id_dispositivo, id_ibeacon) {
    GPIO.associaBeacon(id_dispositivo, id_ibeacon).then(callbackDispositivi);
  };

  $scope.salvaDispositivo = function(id, automatico) {
    Dispositivi.salvaDispositivo(id, automatico).then(callbackDispositivi);
  }

  $scope.cambia = function(id_gpio, id_dispositivo) {
    GPIO.associa(id_gpio, id_dispositivo).then(callback);
  };

})
