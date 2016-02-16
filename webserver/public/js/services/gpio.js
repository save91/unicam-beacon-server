angular.module('beaconApp.services.gpio',[])

.factory('GPIO', function($http, MY_SERVER) {
  return {
    getGPIO: function() {
      return $http({
        method: 'GET',
        url: MY_SERVER.get() + '/gpio'
      }).then(function(response) {
        return response.data;
        });
      },
      setGPIO: function(id, value) {
        return $http({
          method: 'POST',
          url: MY_SERVER.get() + '/gpio_set',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param({
            id: id,
            value: value
          })
        }).then(function(response) {
          return response.data;
          });
        },
        readGPIO: function(id) {
          return $http({
            method: 'POST',
            url: MY_SERVER.get() + '/gpio_get',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
              id: id
            })
          }).then(function(response) {
            return response.data;
            });
          },
        associa: function(id_gpio, id_dispositivo) {
          return $http({
            method: 'POST',
            url: MY_SERVER.get() + '/gpio_edit',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
              id_gpio: id_gpio,
              id_dispositivo: id_dispositivo
            })
          }).then(function(response) {
            return response.data;
            });
        },
        associaBeacon: function(id_gpio, id_ibeacon) {
          return $http({
            method: 'POST',
            url: MY_SERVER.get() + '/gpio_edit_ibeacon',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
              id_gpio: id_gpio,
              id_ibeacon: id_ibeacon
            })
          }).then(function(response) {
            return response.data;
            });
        }
    };
});
