
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, $http, Login) {
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
          window.localStorage['Authorization'] = 'Basic '+ window.btoa($scope.username +':'+$scope.psw);
          console.log($scope.username + ':' + $scope.psw);
          $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
          $location.path('/');
        }
    }

    $scope.login = function() {
      $scope.bloccato = true;
      Login.login($scope.username, $scope.psw).then(callbackLogin);
    };


})
