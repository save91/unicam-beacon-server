angular.module('beaconApp.filters.dispositivi', [])
.filter('DispositviFilter', function() {
  return function(input, tipo) {
    var out = [];
    out.push({id:0, nome:"Nessuno"});
      for (var i = 0; i < input.length; i++){
          if(input[i].io === tipo && input[i].id_GPIO === 0)
              out.push(input[i]);
      }
    return out;
  };
});
