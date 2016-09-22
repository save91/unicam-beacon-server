angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO, $mdDialog, mySocket) {
  $scope.GPIOs = [];
  var updateGPIO = function () {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs = [];
      $scope.GPIOs = res.data;
    },
    function (res) {
      alert = $mdDialog.alert()
      .title('Attenzione')
      .content(res.data)
      .ok('Chiudi');
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
    });
  };
  $scope.getGPIO = function() {
    updateGPIO();
  }

  $scope.setGPIO = function (id, value) {
    GPIO.setOutputGPIO(id, value).then(function(res) {
      updateGPIO();
    },
    function(res) {
      alert = $mdDialog.alert()
      .title('Attenzione')
      .content(res.data)
      .ok('Chiudi');
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
    });
  };

  mySocket.on('put:gpio', function(data) {
    for(var i = 0; i < $scope.GPIOs.length; i++) {
      if($scope.GPIOs[i]._id === data._id ) {
        $scope.GPIOs[i].value = data.value;
        i = $scope.GPIOs.length;
      }
    }
  });

  updateGPIO();
})
