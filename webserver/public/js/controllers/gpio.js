
angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO, dispositivi) {
  $scope.GPIOs = [];
  $scope.dispositivi = [];
  var callbackGPIO = function(risposta) {
    if(risposta.status === 0) {
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei GPIO");
    } else {
      $scope.GPIOs = risposta.gpio;
    }
  };

  var callbackDispositivi = function(risposta) {
    if(risposta.status === 0) {
      $scope.dispositivi = [];
      alert("Impossibile scaricare l'elenco dei dispositivi");
    } else {
      $scope.dispositivi = risposta.dispositivi;
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
})
