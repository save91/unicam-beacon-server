var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var dispositivi = require('./routes/dispositivi');
var users = require('./routes/utenti');
var ibeacons = require('./routes/ibeacons');

//export NODE_ENV=production
//export NODE_ENV=development
//settare NODE_ENV su production e development per lanciare il server
//rispettivamente su Raspberry o PC
var environment = process.env.NODE_ENV
console.log("Environment: ", environment);
if(environment === "development"){
  var gpio = require('./routes/gpio-fake');
  console.log("PC....Avvio in corso");
} else {
  var gpio = require('./routes/gpio');
  console.log("Raspberry....Avvio in corso");
}

var datamanager = require('./package/datamanager');
var app = express();
var SERVERPORT = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// middleware log
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// middleware authentication
app.use([datamanager.get_users, users.authentication]);

//Routing API utente
app.get('/utenti',  users.utenti);
app.post('/login', users.login);
app.post('/utente',  users.utente);
app.post('/check_username', users.check_username);
app.post('/blocca_utente', [users.blocca_utente, datamanager.set_users]);
app.post('/sblocca_utente', [users.sblocca_utente, datamanager.set_users]);
app.post('/aggiorna_utente', [users.aggiorna_utente, datamanager.set_users]);
app.post('/aggiungi_utente', [users.aggiungi_utente, datamanager.set_users]);

//Routing API dispositivo
app.get('/dispositivi', [datamanager.get_dispositivi, dispositivi.dispositivi]);
app.get('/dispositivi_output', [datamanager.get_dispositivi, datamanager.get_gpio, dispositivi.dispositivi_output]);
app.post('/aggiungi_dispositivo', [datamanager.get_dispositivi, dispositivi.aggiungi_dispositivo, datamanager.set_dispositivi]);
app.post('/elimina_dispositivo', [datamanager.get_dispositivi, dispositivi.elimina_dispositivo ,datamanager.set_dispositivi]);
app.post('/salva_dispositivo', [datamanager.get_dispositivi, dispositivi.salva_dispositivo, datamanager.set_dispositivi]);
app.post('/dispositivo_edit_ibeacon', [datamanager.get_dispositivi, dispositivi.dispositivo_edit_ibeacon, datamanager.set_dispositivi]);

//Routing API iBeacon
app.get('/beacons', [datamanager.get_beacons, ibeacons.beacons]);
app.post('/elimina_beacon', [datamanager.get_beacons, ibeacons.elimina_beacon, datamanager.set_beacons]);
app.post('/beacon', [datamanager.get_beacons, ibeacons.beacon, datamanager.set_beacons]);

//Routing API gpio
app.get('/gpio', [datamanager.get_gpio, gpio.gpio]);
app.post('/gpio_set', [datamanager.get_gpio, gpio.gpio_set, datamanager.set_gpio]);
app.post('/gpio_get', [datamanager.get_gpio, gpio.gpio_get, datamanager.set_gpio]);
app.post('/gpio_edit', [datamanager.get_gpio, datamanager.get_dispositivi, gpio.gpio_edit, datamanager.set_dispositivi_gpio]);

//Routing API io
app.get('/io', [datamanager.get_io, gpio.io]);

// Express routes for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

app.post('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

//catches ctrl+c event
process.on('SIGINT', function(){
     console.log("Stop webserver");
     gpio.unexportPins();
});

//Main
gpio.init();
app.listen(SERVERPORT);
console.log('GPIO setup completed and server listening on port ' + SERVERPORT);
