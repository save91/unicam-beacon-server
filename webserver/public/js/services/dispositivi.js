angular.module('beaconApp.services.dispositivi',[])

.factory('Dispositivi', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http({
            method: 'GET',
            url: MY_SERVER.url + ':' + MY_SERVER.port + '/dispositivi'
          }).then(function(response) {
            return {
							status: 1,
							dispositivi: response.data}
            });
          }
        };
  });
