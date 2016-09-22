
angular.module('beaconApp.controllers.users', [])

.controller('UsersCtrl', function($scope, $location, Users, $mdDialog, mySocket) {
  $scope.user = [];

  $scope.updateUser = function() {
    Users.getAll().then(function(res){
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
    Users.editUser(user).then(function(res) {
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
    controller : 'UserCtrl',
    locals: {
      user: user
    },
    templateUrl: 'templates/user.html',

    targetEvent: ev,
  })
  .finally(function() {
    $scope.updateUser();
  });
};

mySocket.on('update:user', function() {
  $scope.updateUser();
});

$scope.updateUser();
});
