
angular.module('beaconApp.controllers.operazioni', [] )

.controller('OperazioniCtrl', function($scope, Devices, GPIO, $mdDialog) {
  $scope.devices = [];
var getGPIO = function() {
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
  var getAll = function () {
    Devices.getAll().then(function(res){
      $scope.devices = res.data;
    },
    function(res){
      alert = $mdDialog.alert()
      .title('Attenzione')
      .content(res.data)
      .ok('Chiudi');
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
    }
  )};
  getAll();
  getGPIO();
});
