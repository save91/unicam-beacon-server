
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, $location, Utenti, $mdDialog) {
  $scope.user = [];

  $scope.updateUser = function() {
    Utenti.getAll().then(function(res){
      $scope.users = res.data;
    },
    function (res) {
      alert = $mdDialog.alert()
           .title('Attenzione')
           .content(res.data)
           .ok('Chiudi');
           $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
    });
  };
  $scope.blockUser = function (user) {
    if (user.block === true) {
      user.block = false;
    } else {
      user.block = true;
    }
    Utenti.editUser(user).then(function(res) {
      $scope.updateUser();
    },
    function(res) {
      alert = $mdDialog.alert()
           .title('Attenzione')
           .content(res.data)
           .ok('Chiudi');
           $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
    }
  );
};
$scope.showAdd = function(user, ev) {
  $mdDialog.show({
    controller : 'UtenteCtrl',
    locals: {
      user: user
    },
    templateUrl: 'templates/utente.html',

    targetEvent: ev,
  })
  .finally(function() {
    $scope.updateUser();
  });
};


$scope.updateUser();
})
