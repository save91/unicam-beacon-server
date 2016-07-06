angular.module('beaconApp.filters.gpio', [])
.filter('GPIOFilter', function() {
  return function(input, type, id) {
    var out = [];
    for (var i = 0; i < input.length; i++){
      if(input[i].type === type && (input[i]._device === null || input[i]._device === id ))
      out.push(input[i]);
    }
    return out;
  };
});
