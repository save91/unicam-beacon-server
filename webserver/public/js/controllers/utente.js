angular.module('beaconApp.controllers.utente', [])

.controller('UtenteCtrl', function($scope, $routeParams, Utenti, Dispositivi) {
  $scope.utente = {};
  $scope.dispositivi = {};
  var aggiorna = function(appoggio) {
    $scope.utente = appoggio;
  };
  $scope.utente = Utenti.getUtente($routeParams.username, aggiorna);
  $scope.bloccato = true;

  var callbackUpdateDispositivi = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        $scope.dispositivi = [];
        alert("Impossibile scaricare l'elenco dei dispositivi");
      } else {
        $scope.dispositivi = risposta.dispositivi;
      }
  };

  $scope.dispositivi = Dispositivi.getAll(callbackUpdateDispositivi);

  $scope.aggiornaDispositivi = function() {
    $scope.bloccato = true;
    Dispositivi.getAll(callbackUpdateDispositivi);
  };
})
