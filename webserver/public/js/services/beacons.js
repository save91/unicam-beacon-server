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
        }
  };
});
