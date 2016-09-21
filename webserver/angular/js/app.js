'use strict';

/* App Module */

var beaconApp = angular.module('beaconApp', [
  'btford.socket-io',
  'ngRoute',
  'ngMaterial',
  'beaconAnimations',
  'beaconApp.controllers.home',
  'beaconApp.controllers.login',
  'beaconApp.controllers.signup',
  'beaconApp.controllers.devices',
  'beaconApp.controllers.users',
  'beaconApp.controllers.user',
  'beaconApp.controllers.actions',
  'beaconApp.controllers.log',
  'beaconApp.controllers.signup_ibeacon',
  'beaconApp.controllers.gpio',
  'beaconApp.controllers.navbar',
  'beaconApp.controllers.add_device',
  'beaconApp.controllers.settings',
  'beaconApp.filters.io',
  'beaconApp.filters.gpio',
  'beaconApp.filters.devices',
  'beaconApp.filters.range',
  'beaconApp.services.login',
  'beaconApp.services.home',
  'beaconApp.services.users',
  'beaconApp.services.beacons',
  'beaconApp.services.devices',
  'beaconApp.services.gpio',
  'beaconApp.services.navbar',
  'beaconApp.services.theme',
  'beaconApp.services.settings',
  'beaconApp.services.socket'
])
.run(function($http, Login, Theme) {
  $http.defaults.headers.common.Authorization = window.localStorage['Authorization'] || "";
      if(window.localStorage["user"]) {
        var user = JSON.parse(window.localStorage["user"]);
        Login.user.username = user.username;
        Login.user.firstname = user.firstname;
        Login.user.lastname = user.lastname;
        Login.user.permission = user.permission;
        Login.user.photo = user.photo;
        Login.user.block = user.block;
        Login.user.theme = user.theme;
        Theme.color = Login.user.theme;

      }
});
