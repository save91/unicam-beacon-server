angular.module('beaconApp.services.login',[])
.constant("myServer", {
		"url": "http://localhost",
		"port": "8000"
})
.factory('Login', function($http, myServer) {
  return {
  	login: function(username, psw, callback) {
			console.log("Richiesta login: ");
      console.log("Username: " + username);
      console.log("Password: " + psw);
			var risposta = {};
      $http({
            method: 'POST',
            url: myServer.url + ':' + myServer.port + '/login',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 						data: $.param({
							username: username,
						 	password: psw
						})
          }).then(function(response) {
            callback({
							status: 1,
							utente: response.data});
          }, function(response) {
            callback({status: 0});
          });
        }
  };
});
