
angular.module('beaconApp.controllers.home', [])

.controller('HomeCtrl',  function($scope, Home, theme, $timeout) {
  var self = this;
        self.hidden = false;
        self.isOpen = false;
        self.hover = false;
  $scope.menu = Home.getMenu();
  $scope.theme = theme;
  $scope.user = null;
  if(localStorage["user"]) {
    $scope.user = JSON.parse(localStorage.getItem("user"));
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
