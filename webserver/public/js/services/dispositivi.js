angular.module('beaconApp.services.dispositivi',[])

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
