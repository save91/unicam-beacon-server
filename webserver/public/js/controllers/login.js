
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, $http, Login) {
  $scope.user = null;
  if(localStorage["user"]) {
    $scope.user = JSON.parse(localStorage.getItem("user"));
  };
  $scope.username = "";
  $scope.password = "";

  $scope.login = function(username, password) {
    Login.login(username, password).then(function(res) {
      alert('Login effettuato');
      window.localStorage['Authorization'] = 'Basic '+ window.btoa(username +':'+password);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      localStorage.setItem("user", JSON.stringify(res.data));
      $scope.user = res.data;
      $scope.autenticato = true;
    },
    function(res) {
      alert('login fallito');
    });
  };
  $scope.errore = function($scope) {
    $scope.project = {
      rate: 500
    };
  };
  $scope.logout = function(){
    alert ('logoutEffettuato');
    $http.defaults.headers.common.Authorization= "";
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization")
    $scope.user = null;
  }
})
