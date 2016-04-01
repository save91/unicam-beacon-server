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
  when('/settings', {
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
  $mdThemingProvider.theme('altTheme')
  .primaryPalette('red')
  .accentPalette('amber')
  $mdThemingProvider.theme('altTheme1')
  .primaryPalette('cyan')
  .accentPalette('deep-orange')
  $mdThemingProvider.theme('altTheme2')
  .primaryPalette('green')
  .accentPalette('deep-purple')
  $mdThemingProvider.setDefaultTheme('altTheme');
  $mdThemingProvider.alwaysWatchTheme(true);
}]);
