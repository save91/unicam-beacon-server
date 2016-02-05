angular.module('beaconApp.services.utenti',[])
.constant("myServer", {
		"url": "http://localhost",
		"port": "8000"
})
.factory('Utenti', function($http, myServer) {
  return {
  	getAll: function(callback) {
      $http({
            method: 'GET',
            url: myServer.url + ':' + myServer.port + '/utenti'
          }).then(function(response) {
            callback({
							status: 1,
							utenti: response.data});
          }, function(response) {
            callback({status: 0});
          });
        }
  };
});
