angular.module('beaconApp.services.gpio',[])

.factory('GPIO', function($http) {
  return {
    getAll: function() {
      return $http.get('/gpio');
    },
    editGPIO: function(gpio, device){
      return $http.put('/gpio', {id_gpio: gpio.id, id_device: device.id});
    },
    getGPIO: function(gpio){
      return $http.get('/gpio/' + gpio.id);
    },
    setOutputGPIO: function(id, value){
      return $http.put('/gpio/' + id + '/set', {value: value});
    }
  };
});
