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
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': '455A64',
    '100': '455A64',
    '200': '455A64',
    '300': '455A64',
    '400': '455A64',
    '500': '455A64',
    '600': '455A64',
    '700': '455A64',
    '800': '455A64',
    '900': '455A64',
    'A100': '455A64',
    'A200': '455A64',
    'A400': '455A64',
    'A700': '455A64',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName')
}]);
