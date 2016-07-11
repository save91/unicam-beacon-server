angular.module('beaconApp.controllers.settings', [])

.controller('SettingsCtrl', function($scope, Settings) {
  $scope.halt = function() {
    console.log("halt");
    Settings.halt().then(function(res) {
      alert(res.data);
    }, function(res) {
      alert('Errore' + res.data);
    });
  };
  $scope.reboot = function() {
    console.log("reboot");
    Settings.reboot().then(function(res) {
      alert(res.data);
    }, function(res) {
      alert('Errore' + res.data);
    });
  };
  $scope.exit = function() {
    console.log("exit");
    Settings.exit().then(function(res) {
      alert(res.data);
    }, function(res) {
      alert('Errore' + res.data);
    });
  };
  $scope.update = function() {
    console.log("update");
    Settings.update().then(function(res) {
      alert(res.data);
    }, function(res) {
      alert('Errore' + res.data);
    });
  };
});
