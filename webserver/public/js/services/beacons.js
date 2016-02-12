angular.module('beaconApp.services.beacons',[])

.factory('Beacons', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http({
            method: 'GET',
            url: MY_SERVER.url + ':' + MY_SERVER.port + '/beacons'
          }).then(function(response) {
            return {
							status: 1,
							beacons: response.data};
          });
        },
      eliminaBeacon: function(id) {
        return $http({
          method: 'POST',
          url: MY_SERVER.url + ':' + MY_SERVER.port + '/elimina_beacon',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param({
            id: id
          })
        }).then(function(response) {
          return response.data;
        })
      },
      getBeacon: function(id) {
        return $http({
          method: 'POST',
          url: MY_SERVER.url + ':' + MY_SERVER.port + '/beacon',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param({
            id: id
          })
        }).then(function(response) {
          return response.data;
        })
      }
  };
});
