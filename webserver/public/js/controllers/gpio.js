angular.module('beaconApp.controllers.gpio', [])

.controller('GPIOCtrl', function($scope, GPIO, $mdDialog) {
  $scope.GPIOs = [];
  var updateGPIO = function () {
    GPIO.getAll().then(function(res) {
      $scope.GPIOs= res.data;
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
    updateGPIO();
})
.directive("hierachyDisplay", ['$timeout', function($timeout) {
 return {
   restrict: "EA",
   link: function(scope, element, attr) {
     $timeout(function() {
       angular.forEach(element.children(), function(child, index) {
         var duration = index / 10;
         var singleStyle= {
           '-o-animation-delay': duration.toString() + 's',
           '-ms-animation-delay': duration.toString() + 's',
           '-moz-animation-delay': duration.toString() + 's',
           '-webkit-animation-delay': duration.toString() + 's',
           'animation-delay': duration.toString() + 's',
         }
         angular.element(child).css(singleStyle);
         angular.element(child).addClass("hierachyanimation hierachyenter");
       })
     })
   }
 }
}]);
