angular.module('beaconApp.services.devices',[])

.factory('Devices', function($http) {
  return {
    getAll: function() {
      return $http.get('/api/v2.0/device');
    },
    getIos: function() {
      return $http.get('/api/v2.0/device/io');
    },
    add: function(device) {
      return $http.post('/api/v2.0/device', device);
    },
    deleteDevice: function(device) {
      return $http.delete('/api/v2.0/device/' + device._id);
    },
    getDevice: function(device) {
      return $http.get('/api/v2.0/device/' + device._id);
    },

    editDevice: function(device) {
      return $http.put('/api/v2.0/device/' + device._id, device);
    },
    setBeaconDevice: function(device, beacon){
      return $http.post('/api/v2.0/device/ibeacon', {id_device: device._id, id_beacon:beacon._id} )
    },
    getOutputDevice: function() {
      return $http.get('/api/v2.0/device/output');
    }
  };
});
