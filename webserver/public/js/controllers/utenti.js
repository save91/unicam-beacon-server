
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, Utenti) {
  $scope.bloccato = true;
  var callbackUpdate = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        $scope.utenti = [];
        alert("Impossibile scaricare l'elenco degli utenti");
      } else {
        $scope.utenti = risposta.utenti;
      }
  };
  $scope.utenti = Utenti.getAll(callbackUpdate);

  $scope.aggiorna = function() {
    $scope.bloccato = true;
    Utenti.getAll(callbackUpdate);
  };
})
