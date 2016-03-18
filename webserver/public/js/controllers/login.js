
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, $http, Login, $mdDialog) {
  $scope.user = null;
  if(localStorage["user"]) {
    $scope.user = JSON.parse(localStorage.getItem("user"));
  };
  $scope.username = "";
  $scope.password = "";

  $scope.login = function(username, password) {
    Login.login(username, password).then(function(res) {
      window.localStorage['Authorization'] = 'Basic '+ window.btoa(username +':'+password);
      $http.defaults.headers.common.Authorization = window.localStorage['Authorization'];
      localStorage.setItem("user", JSON.stringify(res.data));
      $scope.user = res.data;
      $scope.autenticato = true;
    },
    function(res) {
      alert = $mdDialog.alert()
         .title('Attenzione')
         .content('Username o Password errato/i!')
         .ok('Chiudi');
         $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    });
  };
  $scope.errore = function($scope) {
    $scope.project = {
      rate: 500
    };
  };
  $scope.logout = function(){
    alert = $mdDialog.alert()
         .content('logout effettuato')
         .ok('Chiudi');
         $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    $http.defaults.headers.common.Authorization= "";
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization")
    $scope.user = null;
  }
})
