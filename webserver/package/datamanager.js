//datamanager.js
var fs = require('fs');
var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DISPOSITIVI_FILE = ("json/dispositivi.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");

var datamanager = {};
//Questa funzione legge gli users, li aggiunge alla request e li inoltra alla callback successiva
datamanager.get_users = function (req, res, next) {
  console.log('Lettura dispositivi');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.users = JSON.parse(data);
    next();
  });
};

//Questa funzione scrive gli users
datamanager.set_users = function (req, res) {
  console.log('Scrittura users');
  fs.writeFile(USERS_FILE, JSON.stringify(req.users, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

//Questa funzione legge i beacons, li aggiunge alla request e li inoltra alla callback successiva
datamanager.get_beacons = function (req, res, next) {
  console.log('Lettura iBeacons');
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.beacons = JSON.parse(data);
    next();
  });
};

//Questa funzione scrive i beacons
datamanager.set_beacons = function (req, res, next) {
  console.log('Scrittura beacons');
  fs.writeFile(BEACONS_FILE, JSON.stringify(req.beacons, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

//Questa funzione legge i dispositivi, li aggiunge alla request e li inoltra alla callback successiva
datamanager.get_dispositivi = function (req, res, next) {
  console.log('Lettura dispositivi');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.dispositivi = JSON.parse(data);
    next();
  });
};

//Questa funzione scrive i dispositivi
datamanager.set_dispositivi = function (req, res, next) {
  console.log('Scrittura dispositivi');
  fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(req.dispositivi, null), function(err) {
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

//Questa funzione legge i GPIO, li aggiunge alla request e li inoltra alla callback successiva
datamanager.get_gpio = function (req, res, next) {
  console.log('Lettura GPIO');
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

//Questa funzione scrive i GPIO
datamanager.set_dispositivi_gpio = function (req, res) {
  console.log('Scrittura gpio');
  fs.writeFile(GPIO_FILE, JSON.stringify(req.gpio, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(req.dispositivi, null), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

module.exports = datamanager;
