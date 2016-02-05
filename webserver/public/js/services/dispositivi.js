angular.module('beaconApp.services.dispositivi',[])
.constant("myServer", {
		"url": "http://localhost",
		"port": "8000"
})
.factory('Dispositivi', function($http, myServer) {
  return {
  	getAll: function(callback) {
      $http({
            method: 'GET',
            url: myServer.url + ':' + myServer.port + '/dispositivi'
          }).then(function(response) {
            callback({
							status: 1,
							dispositivi: response.data});
          }, function(response) {
            callback({status: 0});
          });
        }
  };
});
