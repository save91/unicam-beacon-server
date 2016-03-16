
angular.module('beaconApp.controllers.operazioni', [] )

.controller('OperazioniCtrl', function($scope, Devices) {
  $scope.devices = [];
  var getOutputDevice = function () {
  Devices.getOutputDevice().then(function(res){
    $scope.devices = res.data;
  },
  function(res){
    alert(res.data);
  }
)};
getOutputDevice();
});
