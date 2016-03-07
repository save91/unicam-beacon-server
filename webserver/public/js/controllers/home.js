
angular.module('beaconApp.controllers.home', [])

.controller('HomeCtrl',  function($scope, Home, theme) {
  $scope.menu = Home.getMenu();
  $scope.theme=theme;

});
