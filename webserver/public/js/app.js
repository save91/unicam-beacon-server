'use strict';

/* App Module */

var beaconApp = angular.module('beaconApp', [
  'ngRoute',
  'beaconApp.controllers.home',
  'beaconApp.controllers.login',
  'beaconApp.controllers.registrati',
  'beaconApp.controllers.dispositivi',
  'beaconApp.controllers.utenti',
  'beaconApp.controllers.operazioni',
  'beaconApp.controllers.log',
  'beaconApp.services.login',
  'beaconApp.services.home',
  'beaconApp.services.utenti'
]);
