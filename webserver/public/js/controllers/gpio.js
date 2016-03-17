angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO) {
  $scope.GPIOs = [];
  var updateGPIO = function () {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs= res.data;
    }, function (res) {
      alert (res.data);
    });
  };
  $scope.setGPIO = function (id, value) {
    GPIO.setOutputGPIO(id, value).then(function(res) {
      updateGPIO();
    },
    function(res) {
      alert (res.data);
    });
  };
  updateGPIO();
})
