'use strict';

/* App Module */

var beaconApp = angular.module('beaconApp', [
  'ngRoute',
  'beaconApp.controllers.home',
  'beaconApp.controllers.login',
  'beaconApp.controllers.registrati',
  'beaconApp.controllers.dispositivi',
  'beaconApp.controllers.utenti',
  'beaconApp.controllers.utente',
  'beaconApp.controllers.operazioni',
  'beaconApp.controllers.log',
  'beaconApp.controllers.registra_ibeacon',
  'beaconApp.filters.io',
  'beaconApp.services.login',
  'beaconApp.services.home',
  'beaconApp.services.utenti',
  'beaconApp.services.beacons',
  'beaconApp.services.dispositivi'
]).
constant("MY_SERVER", {
		"url": "http://localhost",
		"port": "8000"
});
