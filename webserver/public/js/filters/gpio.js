angular.module('beaconApp.filters.gpio', [])
.filter('GPIOFilter', function() {
  return function(input, tipo, id) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].tipo === tipo && (input[i].id_dispositivo === 0 || input[i].id_dispositivo === id ))
              out.push(input[i]);
      }
    return out;
  };
});
