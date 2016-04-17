angular.module('beaconApp.services.users',[])

.factory('Users', function($http) {
  return {
  	getAll: function() {
      return $http.get('/user');
        },
    createUser: function(user){
      return $http.post('/user', user);
    },
    checkUsername: function(user){
      return $http.post('/user', {username: user.username});
    },
    getUser: function(user){
      return $http.get('/user/' + user.username);
    },
    editUser: function(user){
      return $http.put('/user/' + user.username, {
        firstname: user.firstname,
        lastname: user.lastname,
        permission: user.permission,
        block: user.block
      });
    }
  };
});
