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
      }
    };
});
