angular.module('beaconApp.services.gpio',[])

.factory('GPIO', function($http, MY_SERVER) {
  return {
    getAll: function() {
      return $http.get(MY_SERVER.get() + '/gpio');
    },
    editGPIO: function(gpio, device){
      return $http.put(MY_SERVER.get() + '/gpio', {id_gpio: gpio.id, id_device: device.id});
    },
    getGPIO: function(gpio){
      return $http.get(MY_SERVER.get() + '/gpio/' + gpio.id);
    },
    setOutputGPIO: function(gpio){
      return $http.put(MY_SERVER.get() + '/gpio/' + gpio.id + '/set', {value: gpio.state});
    }
  };
});
