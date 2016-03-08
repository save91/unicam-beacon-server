angular.module('beaconApp.services.beacons',[])

.factory('Beacons', function($http, MY_SERVER) {
  return {
    getAll: function() {
      return $http.get( MY_SERVER.get() + '/beacon');
    },
    addBeacon: function(beacon){
      return http.post( MY_SERVER.get() + '/beacon', beacon);
    },
    deleteBeacon: function(beacon) {
      return $http( MY_SERVER.get() + '/beacon/', beacon.id);
    },
    getBeacon: function(beacon) {
      return $http.get( MY_SERVER.get() + '/beacon/' + beacon.id);
    },
    getUnregisteredBeacon: function(){
      return $http.get( MY_SERVER.get() + '/beacon/unregistered');
    }
  };
});
