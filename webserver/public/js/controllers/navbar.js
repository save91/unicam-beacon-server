angular.module('beaconApp.controllers.navbar', [])
.controller('NavigationController', function ($scope, $location, search, $mdSidenav, theme) {
  $scope.self = search;
  $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
$scope.nav = [{
  name: "Home",
  link: "#/",
  icon: "home"
},
{  name: "Gestione Dispositivi",
  link: "#/dispositivi",
  icon: "speaker_phone"
},
{  name: "Gestione GPIO",
  link: "#/gpio",
  icon:"lightbulb_outline"
},
{  name: "Gestione Utenti",
  link: "#/utenti",
  icon: "perm_identity"
},
{  name: "Gestione Operazioni",
  link: "#/operazioni",
  icon: "build"

}];
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
