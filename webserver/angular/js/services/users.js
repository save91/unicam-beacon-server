angular.module('beaconApp.services.users',[])

.factory('Users', function($http) {
  return {
  	getAll: function() {
      return $http.get('/api/v2.0/user');
        },
    createUser: function(user){
      return $http.post('/api/v2.0/user', user);
    },
    checkUsername: function(user){
      return $http.post('/api/v2.0/user', {username: user.username});
    },
    getUser: function(user){
      return $http.get('/api/v2.0/user/' + user.username);
    },
    editUser: function(user){
      return $http.put('/api/v2.0/user/' + user.username, {
        firstname: user.firstname,
        lastname: user.lastname,
        permission: user.permission,
        block: user.block,
        theme: user.theme
      });
    }
  };
});
