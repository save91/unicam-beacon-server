angular.module('beaconApp.controllers.utente', [])

.controller('UtenteCtrl', function($scope, $routeParams, Utenti, Dispositivi) {
  $scope.bloccato = false;
  $scope.utente = {};
  $scope.dispositivi = {};
  var aggiorna = function(appoggio) {
    $scope.bloccato = false;
    if(appoggio.utente.bloccato==="true" || appoggio.utente.bloccato===true) {
      appoggio.utente.bloccato = true;
    } else {
      appoggio.utente.bloccato = false;
    }
    $scope.utente = appoggio.utente;
  };
  Utenti.getUtente($routeParams.username).then(aggiorna);
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

  $scope.dispositivi = Dispositivi.getAll().then(callbackUpdateDispositivi);

  $scope.aggiornaDispositivi = function() {
    $scope.bloccato = true;
    Dispositivi.getAll().then(callbackUpdateDispositivi);
  };

  $scope.modifica = function() {
    $scope.bloccato = true;
    Utenti.updateUtente($scope.utente).then(aggiorna);
  }
})
