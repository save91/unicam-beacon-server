angular.module('beaconApp.services.gpio',[])

.factory('GPIO', function($http) {
  return {
    getAll: function() {
      return $http.get('/api/v2.0/gpio');
    },
    editGPIO: function(gpio, device){
      return $http.put('/api/v2.0/gpio', {id_gpio: gpio._id, id_device: device._id});
    },
    getGPIO: function(gpio){
      return $http.get('/api/v2.0/gpio/' + gpio._id);
    },
    setOutputGPIO: function(id, value){
      return $http.put('/api/v2.0/gpio/' + id + '/set', {value: value});
    }
  };
});
