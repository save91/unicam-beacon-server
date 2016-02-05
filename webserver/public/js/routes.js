beaconApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/registrati', {
        templateUrl: 'templates/registrati.html',
        controller: 'RegistratiCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
