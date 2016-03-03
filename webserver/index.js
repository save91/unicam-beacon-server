var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var devices = require('./routes/devices');
var users = require('./routes/user');
var ibeacons = require('./routes/ibeacons');

var environment = process.env.NODE_ENV
console.log("Environment: ", environment);
if(environment === "development") {
  var gpio = require('./routes/gpio-fake');
  console.log("PC...booting");
} else {
  var gpio = require('./routes/gpio');
  console.log("Raspberry...booting");
}

var datamanager = require('./models/datamanager');
var app = express();
var SERVERPORT = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// middleware authentication & log
app.use([datamanager.get_users, users.authentication, function timeLog(req, res, next) {
  //TODO: Real log
  console.log('Time: ', Date.now());
  next();
}]);

//Routing HelloPackets
//app.get('/hello');//Coming Soon

//Routing API user
app.get('/user',  users.users);
app.post('/user', [users.add_user, datamanager.set_users]);
app.post('/user/login', users.login);
app.post('/user/check_username', users.check_username);
app.get('/user/:username', [users.user, datamanager.set_users]);
app.put('/user/:username', [users.update_user, datamanager.set_users]);
//add.put('/user/:username/photo');//Coming Soon

//Routing API device
app.get('/device', [datamanager.get_devices, devices.devices]);
app.post('/device', [datamanager.get_devices, devices.add_device, datamanager.set_devices]);
app.get('/device/output', [datamanager.get_devices, datamanager.get_gpio, devices.output_devices]);
app.get('/device/:id', [datamanager.get_devices, devices.device]);
app.put('/device/:id', [datamanager.get_devices, devices.update_device, datamanager.set_devices]);
app.delete('/device/:id', [datamanager.get_devices, devices.delete_device ,datamanager.set_devices]);
app.post('/device/ibeacon', [datamanager.get_devices, devices.device_ibeacon, datamanager.set_devices]);

//Routing API iBeacon
app.get('/beacon', [datamanager.get_beacons, ibeacons.beacons]);
app.get('/beacon/unregistered', [datamanager.get_beacons, ibeacons.unregistered_beacons]);
//app.delete('/beacon/:id', [datamanager.get_beacons, ibeacons.delete_beacon, datamanager.set_beacons]);
//app.post('/beacon/:id', [datamanager.get_beacons, ibeacons.add_beacon, datamanager.set_beacons]);
//app.get('/beacon/:id', [datamanager.get_beacons, ibeacons.beacon, datamanager.set_beacons]);

//Routing API gpio
//app.get('/gpio', [datamanager.get_gpio, gpio.gpio]);
//app.put('/gpio', [datamanager.get_gpio, datamanager.get_devices, gpio.gpio_edit, datamanager.set_devices_gpio]);
//app.get('/gpio/:id', [datamanager.get_gpio, gpio.gpio_get, datamanager.set_gpio]);
//app.put('/gpio/:id/set', [datamanager.get_gpio, gpio.gpio_set, datamanager.set_gpio]);

//Routing settings
//app.get('/setting');
//app.put('/setting');
//app.get('/setting/:operazione');

//Routing API io
//app.get('/io', [datamanager.get_io, gpio.io]);

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
