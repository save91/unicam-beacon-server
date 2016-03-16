angular.module('beaconApp.controllers.utente', [])

.controller('UtenteCtrl', function($scope, Utenti, $mdDialog) {
  $scope.closeDialog = function() {
       $mdDialog.hide();
     };
  $scope.editUser = function(user) {
    Utenti.editUser(user).then(
      function(res) {
      $mdDialog.hide($event);
    },
    function(res) {
      alert (res.data);
    })
  }
});
