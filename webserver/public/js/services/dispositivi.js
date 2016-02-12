angular.module('beaconApp.services.dispositivi',[])

.factory('Dispositivi', function($http, MY_SERVER) {
  return {
  	getAll: function() {
      return $http({
            method: 'GET',
            url: MY_SERVER.url + ':' + MY_SERVER.port + '/dispositivi'
          }).then(function(response) {
            return {
							status: 1,
							dispositivi: response.data}
            });
          },
    getIO: function() {
      return $http({
        method: 'GET',
        url: MY_SERVER.url + ':' + MY_SERVER.port + '/io'
      }).then(function(response) {
        return response.data;
        });
      },
    aggiungi: function(dispositivo) {
      return $http({
        method: 'POST',
        url: MY_SERVER.url + ':' + MY_SERVER.port + '/aggiungi_dispositivo',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          type: dispositivo.type,
          io: dispositivo.io,
          nome: dispositivo.nome,
          descrizione: dispositivo.descrizione,
          permessi: " ",
          caratteristiche: dispositivo.caratteristiche
        })
      }).then(function(response) {
        return response.data;
      });
      }
    };
  });
