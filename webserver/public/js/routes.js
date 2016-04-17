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
  when('/signup', {
    templateUrl: 'templates/signup.html',
    controller: 'SignUpCtrl'
  }).
  when('/devices', {
    templateUrl: 'templates/devices.html',
    controller: 'DevicesCtrl'
  }).
  when('/signup_ibeacon/:id', {
    templateUrl: 'templates/signup_ibeacon.html',
    controller: 'SignUpiBeaconCtrl'
  }).
  when('/users', {
    templateUrl: 'templates/users.html',
    controller: 'UsersCtrl'
  }).
  when('/user/:username', {
    templateUrl: 'templates/user.html',
    controller: 'UserCtrl'
  }).
  when('/actions', {
    templateUrl: 'templates/actions.html',
    controller: 'ActionsCtrl'
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
