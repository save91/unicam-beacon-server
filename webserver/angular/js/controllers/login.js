
angular.module('beaconApp.controllers.login', [])

.controller('LoginCtrl', function($scope, $location, $http, Theme, Login, $mdDialog) {
  $scope.user = Login.user;
  $scope.theme = Theme;

  $scope.login = function(username, password) {
    Login.login(username, password).then(function(res) {
      $scope.autenticato = true;
      $scope.theme.color = $scope.user.theme;
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
    Login.logout();
  }
})
