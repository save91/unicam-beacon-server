angular.module('beaconApp.services.dispositivi',[])

.factory('Devices', function($http, MY_SERVER) {
  return {
    getAll: function() {
      return $http.get( MY_SERVER.get() + '/device');
    },
    getIos: function() {
      return $http.get( MY_SERVER.get() + '/io');
    },
    add: function(device) {
      return $http.post(MY_SERVER.get() + '/device', device);
    },
    deleteDevice: function(device) {
      return $http.delete(MY_SERVER.get() + '/device/' + device.id);
    },
    getDevice: function(device) {
      return $http.get(MY_SERVER.get() + '/device/' + device.id);
    },

    editDevice: function(id, automatic) {
      return $http.put(MY_SERVER.get() + '/device/' + device.id,{automatic:automatic});
    },
    setBeaconDevice: function(device, beacon){
      return $http.post(MY_SERVER.get() + '/device/ibeacon', {id_device: device.id, id_beacon:beacon.id} )
    },
    getOutputDevice: function() {
      return $http.get(MY_SERVER.get() + '/device/output');
    }
  };
});
