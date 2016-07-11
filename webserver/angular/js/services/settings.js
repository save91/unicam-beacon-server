angular.module('beaconApp.services.settings',[])

.factory('Settings', function($http) {
  var settings = {};
  settings.halt = function() {
    return $http.get('/api/v2.0/setting/halt');
  };
  settings.reboot = function() {
    return $http.get('/api/v2.0/setting/reboot');
  };
  settings.exit = function() {
    return $http.get('/api/v2.0/setting/exit');
  };
  settings.update = function() {
    return $http.get('/api/v2.0/setting/update');
  };
  return settings;
});
