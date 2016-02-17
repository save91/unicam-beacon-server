angular.module('beaconApp.services.utenti',[])

.factory('Utenti', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http({
            method: 'GET',
            url: MY_SERVER.get() + '/utenti/utenti'
          }).then(function(response) {
            return {
							status: 1,
							utenti: response.data};
          });
        },
        getUtente: function(username) {
          return $http({
                method: 'POST',
                url: MY_SERVER.get() + '/utenti/utente/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    						data: $.param({
    							username: username
    						})
              }).then(function(response) {
                return{
    							status: 1,
    							utente: response.data};
              });
            },
				blocca: function(username) {
					return $http({
						method: 'POST',
						url: MY_SERVER.get() + '/utenti/blocca_utente',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: $.param({
							username: username
						})
					}).then(function(response) {
						return {
							status: 1,
							utenti: response.data
            };
					});
				},

				sblocca: function(username) {
					return $http({
						method: 'POST',
						url: MY_SERVER.get() + '/utenti/sblocca_utente',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: $.param({
							username: username
						})
					}).then(function(response) {
						return {
							status: 1,
							utenti: response.data};
					});
				},
        updateUtente: function(user) {
          return $http({
						method: 'POST',
						url: MY_SERVER.get() + '/utenti/aggiorna_utente',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: $.param(user)
					}).then(function(response) {
						return {
							status: 1,
							utente: response.data};
					});
        }
  };
});
