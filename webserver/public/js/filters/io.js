angular.module('beaconApp.filters.io', [])
.filter('IOFilter', function() {
  return function(input, tipo) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].tipo === tipo)
              out.push(input[i]);
      }
    return out;
  };
});
