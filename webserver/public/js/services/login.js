angular.module('beaconApp.services.login',[])

.factory('Login', function($http, MY_SERVER) {
  return {
  	login: function(username, psw) {
			console.log("Richiesta login: ");
      console.log("Username: " + username);
      console.log("Password: " + psw);
			var risposta = {};
      return $http({
            method: 'POST',
            url: MY_SERVER.get() + '/login',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 						data: $.param({
							username: username,
						 	password: psw
						})
          }).then(function(response) {
            return {
							status: 1,
							utente: response.data};
          });
        }
  };
});
