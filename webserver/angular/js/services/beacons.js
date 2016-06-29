angular.module('beaconApp.services.beacons',[])

.factory('Beacons', function($http) {
  return {
    getAll: function() {
      return $http.get('/beacon');
    },
    addBeacon: function(beacon){
      return http.post('/beacon', beacon);
    },
    deleteBeacon: function(beacon) {
      return $http.delete('/beacon/' + beacon.id);
    },
    getBeacon: function(beacon) {
      return $http.get('/beacon/' + beacon.id);
    },
    getUnregisteredBeacon: function(){
      return $http.get('/beacon/unregistered');
    }
  };
});
