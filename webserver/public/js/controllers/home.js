
angular.module('beaconApp.controllers.home', [])

.controller('HomeCtrl', function($scope, Home) {
  $scope.menu = Home.getMenu();
})
