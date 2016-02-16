
angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO, Dispositivi) {
  $scope.GPIOs = [];
  $scope.dispositivi = [];
  $scope.dispositivi.push({id:0, nome:"Nessuno"});
  var callbackGPIO = function(risposta) {
    if(risposta.status === 0) {
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei GPIO");
    } else {
      $scope.GPIOs = risposta.gpio;
      $scope.GPIOs.push({id:0, GPIO:"Nessuno"});
    }
  };

  var callbackDispositivi = function(risposta) {
    if(risposta.status === 0) {
      $scope.dispositivi = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      $scope.dispositivi = risposta.dispositivi;
      $scope.dispositivi.push({id:0, nome:"Nessuno", io:"input", id_GPIO:0});
      $scope.dispositivi.push({id:0, nome:"Nessuno", io:"output", id_GPIO:0});
      $scope.dispositivi.push({id:0, nome:"Nessuno", io:null, type:"iBeacon"});
    }
  };

  var callback = function(risposta) {
    if(risposta.status === 0) {
      $scope.dispositivi = [];
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      Dispositivi.getAll().then(callbackDispositivi);
      GPIO.getGPIO().then(callbackGPIO);

    }
  };

  GPIO.getGPIO().then(callbackGPIO);
  Dispositivi.getAll().then(callbackDispositivi);

  $scope.on = function(id) {
    GPIO.setGPIO(id, 1).then(callbackGPIO);
  };

  $scope.off = function(id) {
    GPIO.setGPIO(id, 0).then(callbackGPIO);
  };

  $scope.read = function(id) {
    GPIO.readGPIO(id).then(callbackGPIO);
  };

  $scope.cambia = function(id_gpio, id_dispositivo) {
    GPIO.associa(id_gpio, id_dispositivo).then(callback);
  };

})
