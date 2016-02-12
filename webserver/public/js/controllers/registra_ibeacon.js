
angular.module('beaconApp.controllers.registra_ibeacon', [])

.controller('RegistraiBeaconCtrl', function($scope, $routeParams, $location, Beacons, Dispositivi) {
  $scope.dispositivo = {};
  var visualizza = function(risposta) {
    $scope.bloccato = false;
    $scope.dispositivo = {
      type : "iBeacon",
      io : "null",
      nome : "",
      descrizione : "",
      permessi : "",
      caratteristiche : {
        uuid : risposta.beacon.uuid,
        major : risposta.beacon.major,
        minor : risposta.beacon.minor
      }
    }
  };
  Beacons.getBeacon($routeParams.id).then(visualizza);

  $scope.aggiungi = function() {
    Dispositivi.aggiungi($scope.dispositivo);
    Beacons.eliminaBeacon($routeParams.id);
    $location.path("/dispositivi");
  };

})
