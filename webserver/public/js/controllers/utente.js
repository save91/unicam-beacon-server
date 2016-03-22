angular.module('beaconApp.controllers.utente', [])

.controller('UtenteCtrl', function($scope, Utenti, user, $mdDialog) {
  $scope.user = user;
  $scope.closeDialog = function() {
       $mdDialog.hide();
     };
  $scope.editUser = function(user) {
    Utenti.editUser($scope.user).then(
      function(res) {
      $mdDialog.hide();
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
    })
  }
});
