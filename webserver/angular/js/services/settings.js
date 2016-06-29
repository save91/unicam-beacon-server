angular.module('beaconApp.services.settings',[])

.factory('Settings', function($http) {
  var settings = {};
  settings.halt = function() {
    return $http.get('/setting/halt');
  };
  settings.reboot = function() {
    return $http.get('/setting/reboot');
  };
  settings.exit = function() {
    return $http.get('/setting/exit');
  };
  settings.update = function() {
    return $http.get('/setting/update');
  };
  return settings;
});
