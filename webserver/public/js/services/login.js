angular.module('beaconApp.services.login',[])

.factory('Login', function($http, MY_SERVER) {
  return {
    login: function(username, password) {
      return $http.post(MY_SERVER.get() + '/user/login', {
        username: username,
        password: password
      });
    }
  };
});
