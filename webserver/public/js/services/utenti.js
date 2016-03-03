angular.module('beaconApp.services.utenti',[])

.factory('Utenti', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http({
            method: 'GET',
            url: MY_SERVER.get() + '/user'
          }).then(function(response) {
            return {
							status: 1,
							utenti: response.data};
          });
        },
        getUtente: function(username) {
          return $http({
                method: 'GET',
                url: MY_SERVER.get() + '/user/' + username,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              }).then(function(response) {
                return{
    							status: 1,
    							utente: response.data};
              });
            },

        updateUtente: function(user) {
          return $http({
						method: 'PUT',
						url: MY_SERVER.get() + '/user/' + user.username,
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
