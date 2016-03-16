angular.module('beaconApp.services.utenti',[])

.factory('Utenti', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http.get(MY_SERVER.get() + '/user');
        },
    createUser: function(user){
      return $http.post(MY_SERVER.get() + '/user', user);
    },
    checkUsername: function(user){
      return $http.post(MY_SERVER.get() + '/user', {username: user.username});
    },
    getUser: function(user){
      return $http.get(MY_SERVER.get() + '/user/' + user.username);
    },
    editUser: function(user){
      return $http.put(MY_SERVER.get() + '/user/' + user.username, {
        firstname: user.firstname,
        lastname: user.lastname,
        permission: user.permission,
        block: user.block
      });
    }
  };
});
