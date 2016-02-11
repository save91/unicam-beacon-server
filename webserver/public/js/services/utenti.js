angular.module('beaconApp.services.utenti',[])

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
        },
        getUtente: function(username, callback) {
          $http({
                method: 'POST',
                url: myServer.url + ':' + myServer.port + '/utente/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    						data: $.param({
    							username: username
    						})
              }).then(function(response) {
                callback(response.data);
              }, function(response) {
                // Nothing... gestire meglio l'errore
              });
            },
				blocca: function(username, callback) {
					$http({
						method: 'POST',
						url: myServer.url + ':' + myServer.port + '/blocca_utente',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: $.param({
							username: username
						})
					}).then(function(response) {
						callback({
							status: 1,
							utenti: response.data});
					}, function(response) {
						callback({status: 0});
					});
				},
				sblocca: function(username, callback) {
					$http({
						method: 'POST',
						url: myServer.url + ':' + myServer.port + '/sblocca_utente',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: $.param({
							username: username
						})
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
