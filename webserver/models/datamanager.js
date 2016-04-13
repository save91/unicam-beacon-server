//datamanager.js
var fs = require('fs');
var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DEVICE_FILE = ("json/devices.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");
var SETTING_FILE = ("json/settings.json");

var datamanager = {};

datamanager.get_settings = function (req, res, next) {
  fs.readFile(SETTING_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    try {
      req.settings = JSON.parse(data) || [];
    } catch (e) {
      req.settings = {
        "dhcp": false,
        "ip": "127.0.0.1",
        "netmask": "255.255.255.255",
        "version": "1.0.0",
        "name": "ProximitySystem"
      };
    }
    next();
  });
};

datamanager.set_settings = function (req, res) {
  fs.writeFile(SETTING_FILE, JSON.stringify(req.settings, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
};

datamanager.get_users = function (req, res, next) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    try {
      req.users = JSON.parse(data) || [];
    } catch (e) {
      req.users = [{
        "username":"save",
        "firstname":"Saverio",
        "lastname":"Tosi",
        "password":"123456",
        "photo":"img/account.jpg",
        "permission":0,
        "block":false
      }];
    }
    next();
  });
};

datamanager.set_users = function (req, res) {
  fs.writeFile(USERS_FILE, JSON.stringify(req.users, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
};

datamanager.get_beacons = function (req, res, next) {
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    try {
      req.beacons = JSON.parse(data) || [];
    } catch (e) {
      req.beacons = [];
    }
    next();
  });
};

datamanager.set_beacons = function (req, res, next) {
  fs.writeFile(BEACONS_FILE, JSON.stringify(req.beacons, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
};

datamanager.get_devices = function (req, res, next) {
  fs.readFile(DEVICE_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    try {
      req.devices = JSON.parse(data) || [];
    } catch (e) {
      req.devices = [];
    }
    next();
  });
};

datamanager.set_devices = function (req, res, next) {
  fs.writeFile(DEVICE_FILE, JSON.stringify(req.devices, null), function(err) {
    if (err) {
      console.error(err);
    }
  });
};

//Questa funzione legge le tipologie di io, le aggiunge alla request e le inoltra alla callback successiva
datamanager.get_io = function (req, res, next) {
  console.log('Lettura io');
  fs.readFile(IO_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    try {
      req.io = JSON.parse(data) || [];
    } catch (e) {
      req.io = [
        {"id":"1","type":"input","name":"Pulsante"},
        {"id":"2","type":"input","name":"Orologio"},
        {"id":"3","type":"input","name":"Fotocellula"},
        {"id":"4","type":"output","name":"Cancello"},
        {"id":"5","type":"output","name":"Apriporta"},
        {"id":"6","type":"output","name":"Lampada"}
      ];
    }
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
    }
    try {
      req.gpio = JSON.parse(data) || [];
    } catch (e) {
      req.gpio = [
        {
          "id":1,
          "type":"output",
          "GPIO":3,"id_device":0,
          "state":true,"value":1
        },
        {"id":2,"type":"output","GPIO":5,"id_device":0,"state":0,"value":1},{"id":3,"type":"output","GPIO":7,"id_device":0,"state":0,"value":1},{"id":4,"type":"output","GPIO":11,"id_device":0,"value":1},{"id":5,"type":"output","GPIO":13,"id_device":0,"state":true,"value":1},{"id":6,"type":"output","GPIO":15,"id_device":0,"state":true,"value":1},{"id":7,"type":"output","GPIO":19,"id_device":0,"state":true, "value":1},{"id":8,"type":"output","GPIO":21,"id_device":0,"state":true,"value":1}];
    }
    next();
  });
};

//Questa funzione scrive i GPIO
datamanager.set_gpio = function (req, res, next) {
  console.log('Scrittura gpio');
  fs.writeFile(GPIO_FILE, JSON.stringify(req.gpio, null), function(err) {
    if (err) {
      console.error(err);
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
