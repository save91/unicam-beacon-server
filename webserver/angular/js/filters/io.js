angular.module('beaconApp.filters.io', [])
.filter('IOFilter', function() {
  return function(input, type) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].type === type)
              out.push(input[i]);
      }
    return out;
  };
});
