angular.module('beaconApp.filters.gpio', [])
.filter('GPIOFilter', function() {
  return function(input, type, id) {
    var out = [];
    for (var i = 0; i < input.length; i++){
      if(input[i].type === type && (input[i]._Device === null || input[i]._Device === id ))
      out.push(input[i]);
    }
    return out;
  };
});
