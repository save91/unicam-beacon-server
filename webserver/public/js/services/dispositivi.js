angular.module('beaconApp.services.dispositivi',[])

.factory('Devices', function($http, MY_SERVER) {
  return {
    getAll: function() {
      return $http.get( MY_SERVER.get() + '/device')
    },
    getIO: function() {
      return
      $http({
        method: 'GET',
        url: MY_SERVER.get() + '/io'
      }).then(function(response) {
        return response.data;
      });
    },
    add: function(device) {
      return $http.post(MY_SERVER.get() + '/device', device);
    },
    deleteDevice: function(device) {
      return $http.delete(MY_SERVER.get() + '/device/' + device.id);
    },
  salvaDispositivo: function(id, automatico) {
    return $http({
      method: 'POST',
      url: MY_SERVER.get() + '/salva_dispositivo',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
        id: id,
        automatico, automatico
      })
    }).then(function(response) {
      return response.data;
    });
  }
};
});
