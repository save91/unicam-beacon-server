
angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO) {
  $scope.GPIOs = [];
  var callbackGPIO = function(risposta) {
    if(risposta.status === 0) {
      $scope.GPIOs = [];
      alert("Impossibile scaricare l'elenco dei GPIO");
    } else {
      $scope.GPIOs = risposta.gpio;
    }
  };
  GPIO.getGPIO().then(callbackGPIO);

  $scope.on = function(id) {
    GPIO.setGPIO(id, 1).then(callbackGPIO);
  };

  $scope.off = function(id) {
    GPIO.setGPIO(id, 0).then(callbackGPIO);
  };

  $scope.read = function(id) {
    GPIO.getGPIO(id).then(callbackGPIO);
  };
})
