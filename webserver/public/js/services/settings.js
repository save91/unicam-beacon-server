angular.module('beaconApp.services.settings',[])

.factory('Settings', function($http, MY_SERVER) {
  var settings = {};
  settings.halt = function() {
    return $http.get(MY_SERVER.get() + '/setting/halt');
  };
  settings.reboot = function() {
    return $http.get(MY_SERVER.get() + '/setting/reboot');
  };
  settings.exit = function() {
    return $http.get(MY_SERVER.get() + '/setting/exit');
  };
  settings.update = function() {
    return $http.get(MY_SERVER.get() + '/setting/update');
  };
  return settings;
});
