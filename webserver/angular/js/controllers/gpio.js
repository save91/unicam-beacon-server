angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO, $mdDialog, mySocket) {
  $scope.GPIOs = [];

  $scope.setGPIO = function(id, value) {
    console.log("setGPIO");
    mySocket.emit('put:gpio', {"id": id, "value": value});
    for(var i = 0; i < $scope.GPIOs.length; i++) {
      if($scope.GPIOs[i]._id === id ) {
        $scope.GPIOs[i].value = value;
        i = $scope.GPIOs.length;
      }
    }
  };

  var getGPIO = function() {
    mySocket.emit('get:gpio');
  };

  mySocket.on('get:gpio', function(data) {
    console.log("getGPIO");
    $scope.GPIOs = data;
  });

  mySocket.on('put:gpio', function(data) {
    for(var i = 0; i < $scope.GPIOs.length; i++) {
      if($scope.GPIOs[i]._id === data._id ) {
        $scope.GPIOs[i].value = data.value;
        i = $scope.GPIOs.length;
      }
    }
  })

  getGPIO();
})
