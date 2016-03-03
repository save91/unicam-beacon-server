angular.module('beaconApp.controllers.navbar', [])
.controller('NavigationController', function ($scope, $location, search) {
  $scope.self = search;
$scope.nav = [{
  name: "Home",
  link: "#/"
},
{  name: "Gestione Dispositivi",
  link: "#/dispositivi"
},
{  name: "Gestione GPIO",
  link: "#/gpio"
},
{  name: "Gestione Utenti",
  link: "#/utenti"
},
{  name: "Gestione Operazioni",
  link: "#/operazioni"

}];
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
