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
})
.filter('DeviceOutputFilter', function() {
  return function(input) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].io === 'output')
              out.push(input[i]);
      }
    return out;
  };
})
.filter('TypeandSearchDeviceFilter', function() {
  return function(input, tipo, query) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].io === tipo && (input[i].nome.toUpperCase().indexOf(query.toUpperCase()) !== -1))
              out.push(input[i]);
      }
    return out;
  };
})
.filter('BeaconFilter', function() {
  return function(input) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].type === "Beacon" )
              out.push(input[i]);
      }
    return out;
  };
})
  .filter('stateFilter', function() {
    return function(input) {
      var out = [];
        for (var i = 0; i < input.length; i++){
            if(input[i].state === 1 )
                out.push(input[i]);
        }
      return out;
    };
});
