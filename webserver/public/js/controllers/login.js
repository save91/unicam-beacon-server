
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, Login) {
    $scope.username = "";
    $scope.psw = "";
    $scope.bloccato = false;
    $scope.utente = {};

    var callbackLogin = function(risposta) {
        $scope.bloccato = false;
        console.log(risposta);
        if(risposta.status === 0) {
          alert("Nome utente o password errati");
        } else {
          $location.path('/');
        }
    }

    $scope.login = function() {
      $scope.bloccato = true;
      Login.login($scope.username, $scope.psw).then(callbackLogin);
    };


})
