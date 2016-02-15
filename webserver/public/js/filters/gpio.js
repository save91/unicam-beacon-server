angular.module('beaconApp.filters.gpio', [])
.filter('GPIOFilter', function() {
  return function(input, tipo) {
    var out = [];
    out.push({id:0, nome:"Nessuno"});
      for (var i = 0; i < input.length; i++){
          if(input[i].tipo === tipo && input[i].id_dispositivo === 0)
              out.push(input[i]);
      }
    return out;
  };
});
