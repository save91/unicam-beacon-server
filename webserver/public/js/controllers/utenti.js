
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, Utenti) {
  $scope.bloccato = true;
  $scope.utenti = [];
  var callbackUpdate = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        //$scope.utenti = [];
        //alert(messaggio);
      } else {
        $scope.utenti = risposta.utenti;
      }
  };
  $scope.utenti = Utenti.getAll(callbackUpdate);

  $scope.aggiorna = function() {
    $scope.bloccato = true;
    Utenti.getAll(callbackUpdate);
  };

  $scope.blocca = function(nome) {
    $scope.bloccato = true;
    Utenti.blocca(nome, callbackUpdate);
  };

  $scope.sblocca = function(nome) {
    $scope.bloccato = true;
    Utenti.sblocca(nome, callbackUpdate);
  };

  $scope.modifica = function(nome) {
    alert('Modifica: ' + nome + ' funzione da implementare!!!');
  };

  $scope.controllaAttivita = function(nome) {
    alert('Controlla attività: ' + nome + ' funzione da implementare!!!');
  };

})
