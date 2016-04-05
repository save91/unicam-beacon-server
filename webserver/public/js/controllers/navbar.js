angular.module('beaconApp.controllers.navbar', [])
.controller('NavigationController', function ($scope, $location, search, $mdSidenav, theme, Login) {
  $scope.self = search;
  $scope.user = Login.user;
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.nav = [{
    name: "Home",
    link: "#/",
    icon: "img/home.svg"
  },
  {
    name: "Gestione Dispositivi",
    link: "#/dispositivi",
    icon: "img/speaker_phone.svg"
  },
  {
    name: "Gestione GPIO",
    link: "#/gpio",
    icon:"img/lightbulb_outline.svg"
  },
  {
    name: "Gestione Utenti",
    link: "#/utenti",
    icon: "img/perm_identity.svg"
  },
  {
    name: "Gestione Operazioni",
    link: "#/operazioni",
    icon: "img/build.svg"
  },
  {
    name: "Impostazioni",
    link: "#/settings",
    icon: "img/settings.svg"
  }];
  $scope.selectedPlanName=$location.url();
  $scope.theme=theme;
  $scope.visualizza = false;
  $scope.$on('$routeChangeStart', function (next, current){
    var cerca = $location.url();
    if (cerca === "/operazioni"){
      $scope.visualizza=true;
    } else {
      $scope.visualizza=false;
    }
  });

});
