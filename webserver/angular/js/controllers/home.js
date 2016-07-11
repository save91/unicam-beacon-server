
angular.module('beaconApp.controllers.home', [])

.controller('HomeCtrl',  function($scope, Home, Theme, $timeout, Login, Users) {
  $scope.user = Login.user;
  var self = this;
  self.hidden = false;
  self.isOpen = false;
  self.hover = false;
  $scope.menu = Home.getMenu();
  $scope.theme = Theme;
  $scope.setTheme = function (color) {
    $scope.theme.color = color;
    $scope.user.theme = color;
    window.localStorage['user'] = JSON.stringify(Login.user);
    Users.editUser($scope.user);
  };
  $scope.$watch('demo.isOpen', function(isOpen) {
    if (isOpen) {
      $timeout(function() {
        $scope.tooltipVisible = self.isOpen;
      }, 600);
    } else {
      $scope.tooltipVisible = self.isOpen;
    }
  });
});
