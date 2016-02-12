
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
    alert("On led "+id);
  };

  $scope.off = function(id) {
    alert("Off led "+id);
  };

  $scope.read = function(id) {
    alert("Letto pin "+id);
  };
})
