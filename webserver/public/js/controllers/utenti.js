
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, $location, Utenti) {
  $scope.bloccato = true;
  $scope.utenti = [];
  var callbackUpdate = function(risposta) {
      $scope.bloccato = false;
      if(risposta.status === 0) {
        //$scope.utenti = [];
        //alert(messaggio);
      } else {
        for(var i=0; i<risposta.utenti.length; i++) {
          if(risposta.utenti[i].bloccato==="true" || risposta.utenti[i].bloccato===true) {
            risposta.utenti[i].bloccato = true;
          } else {
            risposta.utenti[i].bloccato = false;
          }
        }
        $scope.utenti = risposta.utenti;
      }
  };

  var callback = function() {
    $scope.utenti = Utenti.getAll().then(callbackUpdate);
  }

  $scope.utenti = Utenti.getAll().then(callbackUpdate);

  $scope.aggiorna = function() {
    $scope.bloccato = true;
    Utenti.getAll().then(callbackUpdate);
  };

  $scope.blocca = function(user) {
    $scope.bloccato = true;
    user.block = true;
    Utenti.updateUtente(user).then(callback);
  };

  $scope.sblocca = function(user) {
    $scope.bloccato = true;
    user.block = false;
    Utenti.updateUtente(user).then(callback);
  };

  $scope.modifica = function(username) {
    $location.path('/utente/' + username);
  };

  $scope.controllaAttivita = function(nome) {
    alert('Controlla attività: ' + nome + ' funzione da implementare!!!');
  };

})
