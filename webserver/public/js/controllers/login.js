
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, $http, Login) {
  $scope.username = "";
  $scope.password = "";
  $scope.bloccato = false;
  $scope.utente = {};
  if($http.defaults.headers.common.Authorization !== "") {
    $scope.autenticato = true;
  } else {
    $scope.autenticato = false;
  }

  var callbackLogin = function(risposta) {
    $scope.bloccato = false;
    console.log(risposta);
    if(risposta.status === 0) {
      alert("Nome utente o password errati");
    } else {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa(risposta.username +':'+risposta.password);
      console.log($scope.username + ':' + $scope.psw);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      $location.path('/');
    }
  }

  $scope.login = function(username, password) {
    Login.login(username, password).then(function(res) {
      alert('Login effettuato');
      window.localStorage['Authorization'] = 'Basic '+ window.btoa(username +':'+password);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
    },
    function(res) {
      alert('login fallito');
    }
  );
};
})
