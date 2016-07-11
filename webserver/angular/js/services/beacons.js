angular.module('beaconApp.services.beacons',[])

.factory('Beacons', function($http) {
  return {
    getAll: function() {
      return $http.get('/api/v2.0/beacon');
    },
    addBeacon: function(beacon){
      return http.post('/api/v2.0/beacon', beacon);
    },
    deleteBeacon: function(beacon) {
      return $http.delete('/api/v2.0/beacon/' + beacon._id);
    },
    getBeacon: function(beacon) {
      return $http.get('/api/v2.0/beacon/' + beacon._id);
    },
    getUnregisteredBeacon: function(){
      return $http.get('/api/v2.0/beacon/unregistered');
    }
  };
});
