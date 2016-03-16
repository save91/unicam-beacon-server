
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, $location, Utenti, $mdDialog) {
  $scope.user = [];

  $scope.updateUser = function() {
    Utenti.getAll().then(function(res){
      $scope.users = res.data;
    },
    function (res) {
      alert (res.data);
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
      alert (res.data);
    }
  );
};
$scope.showAdd = function(user, ev) {
  $scope.user = user;
  $mdDialog.show({
    controller : 'UtenteCtrl',
    scope: $scope,
    templateUrl: 'templates/utente.html',

    targetEvent: ev,
  })
  .finally(function() {
    $scope.updateUser();
  });
};


$scope.updateUser();
})
