
angular.module('beaconApp.controllers.utenti', [])

.controller('UtentiCtrl', function($scope, $location, Utenti) {
  $scope.users = [];

  var updatedUser = function() {
    Utenti.getAll().then(function(res){
      $scope.users = res.data;
    },
    function (res) {
      alert (res.data);
    }
  );
};
$scope.createUser = function () {
  Utenti.createUser($scope.users).then(
    function(res) {
      updateUser();
    },
    function (res){
      alert (res.data);
    }
  );
  $scope.user.username = "";
  $scope.user.firstename = "";
  $scope.user.lastaname = "";
  $scope.user.permission = 10;
  $scope.user.block = true;
}
$scope.updatedUser = function () {
  updatedUser();
};
$scope.checkUsername = function () {
  Utenti.checkUsername($scope.users).then(
    function(res) {
      updateUser();
    },
    function (res){
      alert (res.data);
    }
  )
};
updatedUser();
})
