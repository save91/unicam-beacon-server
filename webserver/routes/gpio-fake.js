//gpio-fake
var fs = require('fs');
var GPIO_FILE = ("json/gpio.json");
var gpio = {};
var execute = require('child_process').exec;

gpio.io = function (req, res) {
  if(!req.user.block) {
    res.status(200).send(req.io);
  } else {
    res.status(401).send("Authentication required");
  }
};

gpio.gpio = function (req, res) {
  if(req.user.block === false) {
    res.status(200).send(req.gpio);
  } else {
    res.status(401).send("Authentication required");
  }
};

gpio.gpio_set = function (req, res, next) {
  if(!req.user.block) {
    var i = 0;
    var pos = -1;
    var id = parseInt(req.params.id);
    var val = parseInt(req.body.value);
    while(pos === -1 && i < req.gpio.length) {
      if(req.gpio[i].id === id) {
        pos = i;
        req.gpio[i].value = val;
      }
      i++;
    }
    if(pos>=0) {
      res.status(200).send("Success");
      execute('espeak -v it "' + req.user.firstname + ' ha effettuato un operazione"');
      next();
    } else {
      res.status(404).send("GPIO not found");
    }
  } else {
    res.status(401).send("Authorization required");
  }
};

gpio.gpio_edit = function (req, res, next) {
  if(!req.user.block) {
    var id_GPIO = parseInt(req.body.id_gpio);
    var id_device = parseInt(req.body.id_device);
    var pos = -1;
    var i = 0;
    while(pos === -1 && i < req.devices.length) {
      if(req.devices[i].id === id_device) {
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
  } else  {
    res.status(401).send("Authentication required");
  }
};

gpio.gpio_get = function (req, res, next) {
  if(!req.user.block) {
    var i = 0;
    var pos = -1;
    var id = parseInt(req.params.id);
    while(pos===-1 && i<req.gpio.length) {
      if(req.gpio[i].id===id) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      req.gpio[pos].state = true;
      res.status(200).send(req.gpio[pos]);
      next();
    } else {
      res.status(404).send("Not found");
    }
  } else {
    res.status(401).send("Authorization required");
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
