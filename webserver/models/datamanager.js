//datamanager.js
var fs = require('fs');
var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DEVICE_FILE = ("json/devices.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");

var datamanager = {};
datamanager.get_users = function (req, res, next) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.users = JSON.parse(data);
    next();
  });
};

datamanager.set_users = function (req, res) {
  fs.writeFile(USERS_FILE, JSON.stringify(req.users, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

datamanager.get_beacons = function (req, res, next) {
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.beacons = JSON.parse(data);
    next();
  });
};

datamanager.set_beacons = function (req, res, next) {
  fs.writeFile(BEACONS_FILE, JSON.stringify(req.beacons, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

datamanager.get_devices = function (req, res, next) {
  fs.readFile(DEVICE_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.devices = JSON.parse(data);
    next();
  });
};

datamanager.set_devices = function (req, res, next) {
  fs.writeFile(DEVICE_FILE, JSON.stringify(req.devices, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

//Questa funzione legge le tipologie di io, le aggiunge alla request e le inoltra alla callback successiva
datamanager.get_io = function (req, res, next) {
  console.log('Lettura io');
  fs.readFile(IO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.io = JSON.parse(data);
    next();
  });
};

//Questa funzione scrive le tipologi di io
datamanager.set_io = function (req, res, next) {
  console.log('Scrittura io');
  fs.writeFile(IO_FILE, JSON.stringify(req.io, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

datamanager.get_gpio = function (req, res, next) {
  fs.readFile(GPIO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.gpio = JSON.parse(data);
    next();
  });
};

//Questa funzione scrive i GPIO
datamanager.set_gpio = function (req, res, next) {
  console.log('Scrittura gpio');
  fs.writeFile(GPIO_FILE, JSON.stringify(req.gpio, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

datamanager.set_devices_gpio = function (req, res) {
  fs.writeFile(GPIO_FILE, JSON.stringify(req.gpio, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile(DEVICE_FILE, JSON.stringify(req.devices, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = datamanager;
