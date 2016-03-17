'use strict';

/* App Module */

var beaconApp = angular.module('beaconApp', [
  'ngRoute',
  'ngMaterial',
  'beaconAnimations',
  'beaconApp.controllers.home',
  'beaconApp.controllers.login',
  'beaconApp.controllers.registrati',
  'beaconApp.controllers.dispositivi',
  'beaconApp.controllers.utenti',
  'beaconApp.controllers.utente',
  'beaconApp.controllers.operazioni',
  'beaconApp.controllers.log',
  'beaconApp.controllers.registra_ibeacon',
  'beaconApp.controllers.gpio',
  'beaconApp.controllers.navbar',
  'beaconApp.controllers.aggiungidispositivo',
  'beaconApp.controllers.settings',
  'beaconApp.filters.io',
  'beaconApp.filters.gpio',
  'beaconApp.filters.dispositivi',
  'beaconApp.filters.range',
  'beaconApp.services.login',
  'beaconApp.services.home',
  'beaconApp.services.utenti',
  'beaconApp.services.beacons',
  'beaconApp.services.dispositivi',
  'beaconApp.services.gpio',
  'beaconApp.services.navbar',
  'beaconApp.services.theme',
  'beaconApp.services.settings',
])
.run(function($http) {
    $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
})
.constant("MY_SERVER", {
		"url": "http://192.168.24.100",
		"port": "8000",
    "get": function() {
      return ("");
    }
});
