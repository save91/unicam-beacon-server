//gpio-fake
var fs = require('fs');
var GPIO_FILE = ("json/gpio.json");
var gpio = {};

gpio.io = function (req, res) {
  res.status(200).send(req.io);
};

gpio.gpio = function (req, res) {
  res.status(200).send(req.gpio);
};

gpio.gpio_set = function (req, res, next) {
  var i = 0;
  var pos = -1;
  var id = parseInt(req.body.id);
  var val = parseInt(req.body.value);
  while(pos === -1 && i < req.gpio.length) {
    if(req.gpio[i].id === id) {
      pos = i;
    }
    i++;
  }
  if(pos>=0) {
    res.status(200).send(req.gpio);
    next();
  }
};

gpio.gpio_edit = function (req, res, next) {
  var id_GPIO = parseInt(req.body.id_gpio);
  var id_device = parseInt(req.body.id_device);
  var pos = -1;
  var i = 0;
  while(pos === -1 && i < req.devices.length) {
    if(req.dispositivi[i].id === id_device) {
      var pos2 = -1;
      var j = 0;
      while(pos2 === -1 && j < req.gpio.length) {
        if(req.gpio[j].id === req.devices[i].id_GPIO) {
          req.gpio[j].id_device = 0;
          pos2 = j;
        }
        j++;
      }
      req.devices[i].id_GPIO = id_GPIO;
      pos = i;
    }
    i++;
  }
  pos = -1;
  i = 0;
  while(pos === -1 && i < req.gpio.length) {
    if(req.gpio[i].id === id_GPIO) {
      req.gpio[i].id_device = id_device;
      pos = i;
    }
    i++;
  }
  res.status(200).send("Success");
  next();
};


gpio.gpio_get = function (req, res, next) {
  var i = 0;
  var pos = -1;
  var id = parseInt(req.body.id);
  while(pos===-1 && i<req.gpio.length) {
    if(req.gpio[i].id===id) {
      pos = i;
    }
    i++;
  }
  if(pos>=0) {
    req.gpio[pos].state = true;
    res.status(200).send(req.gpio);
    next();
  }
};

function setPin(pin, value, callback) {
  console.log("Setting pin "+pin+" to " + value);
}

function readStatus(PIN, callback) {
  console.log("Reading pin "+PIN);
  callback(null,true);
}

gpio.init = function () {
  console.log('Init GPIO');
};

gpio.unexportPins = function() {
  console.log('All pins unexported');
  process.exit();
};

module.exports = gpio;
