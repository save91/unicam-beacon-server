angular.module('beaconApp.services.devices',[])

.factory('Devices', function($http) {
  return {
    getAll: function() {
      return $http.get('/device');
    },
    getIos: function() {
      return $http.get('/io');
    },
    add: function(device) {
      return $http.post('/device', device);
    },
    deleteDevice: function(device) {
      return $http.delete('/device/' + device.id);
    },
    getDevice: function(device) {
      return $http.get('/device/' + device.id);
    },

    editDevice: function(device) {
      return $http.put('/device/' + device.id, device);
    },
    setBeaconDevice: function(device, beacon){
      return $http.post('/device/ibeacon', {id_device: device.id, id_beacon:beacon.id} )
    },
    getOutputDevice: function() {
      return $http.get('/device/output');
    }
  };
});
