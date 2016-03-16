angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO) {
  $scope.GPIOs = [];
  var updateGPIO = function () {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs= res.data;
    },
    function (res) {
      alert (res.data);
    }
  );
};
$scope.setOutputGPIO = function (value) {
  GPIO.setOutputGPIO(value).then(
    function(res){
      alert(res.data);
    }
  )
}
$scope.setOffGPIO = function (gpio) {
  gpio.state = false;
  GPIO.setOutputGPIO(gpio).then(function(res) {
    updateGPIO();
  },
  function(res) {
    alert (res.data);
  }
);
};
$scope.setOnGPIO = function (gpio) {
  gpio.state = true;
  GPIO.setOutputGPIO(gpio).then(function(res) {
    updateGPIO();
  },
  function(res) {
    alert (res.data);
  }
);
};
updateGPIO();
})
