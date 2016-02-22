//gpio-fake.js
var fs = require('fs');
//var GPIO = require('rpi-gpio');
var GPIO_FILE = ("json/gpio.json");
//Oggetto gpio
var gpio = {};

gpio.io = function (req, res) {
  console.log('io request');
  res.status(200).send({"status":"1","io":req.io});
};

gpio.gpio = function (req, res) {
  console.log('gpio request');
  res.status(200).send({"status":"1","gpio":req.gpio});
};

gpio.gpio_set = function (req, res, next) {
  console.log('set gpio request');
  var i = 0;
  var trovato = -1;
  var id = parseInt(req.body.id);
  var val = parseInt(req.body.value);
  while(trovato===-1 && i<req.gpio.length) {
    if(req.gpio[i].id===id) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    res.status(200).send({status:"1", gpio: req.gpio});
    next();
  }
};


gpio.gpio_edit = function (req, res, next) {
  console.log('edit gpio request');
  var id_GPIO = parseInt(req.body.id_gpio);
  var id_dispositivo = parseInt(req.body.id_dispositivo);
  var trovato = -1;
  var i = 0;
  //
  while(trovato === -1 && i < req.dispositivi.length) {
    if(req.dispositivi[i].id === id_dispositivo) {
      var trovato2 = -1;
      var j = 0;
      while(trovato2 === -1 && j < req.gpio.length) {
        if(req.gpio[j].id === req.dispositivi[i].id_GPIO) {
          req.gpio[j].id_dispositivo = 0;
          trovato2 = j;
        }
        j++;
      }
      req.dispositivi[i].id_GPIO = id_GPIO;
      trovato = i;
    }
    i++;
  }
  //
  trovato = -1;
  i = 0;
  while(trovato === -1 && i < req.gpio.length) {
    if(req.gpio[i].id === id_GPIO) {
      req.gpio[i].id_dispositivo = id_dispositivo;
      trovato = i;
    }
    i++;
  }
  res.status(200).send({status:"1"});
  next();
};


gpio.gpio_get = function (req, res, next) {
  console.log('get gpio request');
  var i = 0;
  var trovato = -1;
  var id = parseInt(req.body.id);
  while(trovato===-1 && i<req.gpio.length) {
    if(req.gpio[i].id===id) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    req.gpio[trovato].stato = true;
    res.status(200).send({status:"1", gpio: req.gpio});
    next();
  }
};

function setPin(pin, value, callback) {
  console.log("Setting pin "+pin+" to " + value);
}

function readStatus(PIN, callback) {
  console.log("reading pin "+PIN);
  callback(null,true);
}

gpio.init = function () {
  console.log('Inizializzazione GPIO');
};

gpio.unexportPins = function() {
  console.log('All pins unexported');
  process.exit();
};

module.exports = gpio;
