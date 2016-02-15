angular.module('beaconApp.filters.dispositivi', [])
.filter('DispositiviFilter', function() {
  return function(input, tipo, id) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].io === tipo && (input[i].id_GPIO === 0 || input[i].id === id ))
              out.push(input[i]);
      }
    return out;
  };
});
