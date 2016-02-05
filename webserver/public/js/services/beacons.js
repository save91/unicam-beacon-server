angular.module('beaconApp.services.beacons',[])
.constant("myServer", {
		"url": "http://localhost",
		"port": "8000"
})
.factory('Beacons', function($http, myServer) {
  return {
  	getAll: function(callback) {
      $http({
            method: 'GET',
            url: myServer.url + ':' + myServer.port + '/beacons'
          }).then(function(response) {
            callback({
							status: 1,
							beacons: response.data});
          }, function(response) {
            callback({status: 0});
          });
        }
  };
});
