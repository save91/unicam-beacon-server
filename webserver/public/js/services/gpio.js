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
        getGPIO: function(id) {
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
          }
    };
});
