beaconApp.config(['$routeProvider', '$mdThemingProvider',
function($routeProvider, $mdThemingProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  }).
  when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  }).
  when('/gpio', {
    templateUrl: 'templates/gpio.html',
    controller: 'GPIOCtrl'
  }).
  when('/registrati', {
    templateUrl: 'templates/registrati.html',
    controller: 'RegistratiCtrl'
  }).
  when('/dispositivi', {
    templateUrl: 'templates/dispositivi.html',
    controller: 'DevicesCtrl'
  }).
  when('/registra_ibeacon/:id', {
    templateUrl: 'templates/registra_ibeacon.html',
    controller: 'RegistraiBeaconCtrl'
  }).
  when('/utenti', {
    templateUrl: 'templates/utenti.html',
    controller: 'UtentiCtrl'
  }).
  when('/utente/:username', {
    templateUrl: 'templates/utente.html',
    controller: 'UtenteCtrl'
  }).
  when('/operazioni', {
    templateUrl: 'templates/operazioni.html',
    controller: 'OperazioniCtrl'
  }).
  when('/log', {
    templateUrl: 'templates/log.html',
    controller: 'LogCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
  $mdThemingProvider.theme('altTheme')
  .primaryPalette('red')
  $mdThemingProvider.theme('altTheme1')
  .primaryPalette('orange')
  $mdThemingProvider.theme('altTheme2')
  .primaryPalette('green')
  $mdThemingProvider.setDefaultTheme('altTheme');
  $mdThemingProvider.alwaysWatchTheme(true);
}]);
