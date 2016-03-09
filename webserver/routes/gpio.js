var fs = require('fs');
var GPIO = require('rpi-gpio');
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
    while(pos===-1 && i<req.gpio.length) {
      if(req.gpio[i].id===id) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      setPin(req.gpio[pos].GPIO, val, function(err) {
        if (err) {
          res.status(500).send('Oops, Something went wrong! ' + err);
        } else {
          req.gpio[pos].stato = val;
          execute('espeak -v it "' + req.user.firstname + ' ha ' + val===true?"acceso":"spento" + ' un led" 2>/dev/null');
          res.status(200).send("Success");
          next();
        }
      })
    } else {
      res.status(404).send("GPIO not found");
    }
  } else {
    res.status(401).send("Authorization required");
  }
};

gpio.gpio_edit = function (req, res, next) {
  if(!req.user.block) {
    var id_GPIO = parseInt(req.params.id_gpio);
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
    var trovato = -1;
    var id = parseInt(req.params.id);
    while(trovato===-1 && i<req.gpio.length) {
      if(req.gpio[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      readStatus(req.gpio[trovato].GPIO, function(err, value) {
        if (err) {
          res.status(500).send('Oops, Something went wrong! ' + err);
        } else {
          req.gpio[trovato].stato = value;
          execute('espeak -v it "' + req.user.firstname + ' ha effettuato un operazione"');
          res.status(200).send("Success");
          next();
        };
      });
    }  else {
      res.status(404).send("GPIO not found");
    }
  } else {
    res.status(401).send("Authorization required");
  }
};

function setPin(pin, value, callback) {
  console.log("Setting pin "+pin+" to " + value);
  GPIO.write(pin, value, function(err) {
    if (err) {
      console.log("error writing " + err);
      callback("error writing " + err);
      return;
    }
    callback();
  });
}

function readStatus(PIN, callback) {
  console.log("reading pin "+PIN);
  GPIO.read(PIN, function(err,value) {
    if (err) {
      console.log("error reading pin " + err, null);
      callback("error reading pin " + err, null);
      return;
    }
    callback(null,value);
  });
}

gpio.init = function () {
  GPIO.on('change', function(channel, value) {
    debugger;
    console.log('Channel ' + channel + ' value is now ' + value);
  });
  fs.readFile(GPIO_FILE, function(err, data) {
    var GPIOs = [];
    if (err) {
      console.error(err);
      process.exit(1);
    }
    GPIOs = JSON.parse(data);
    for(var i=0;i<GPIOs.length;i++) {
      if(GPIOs[i].tipo==="output") {
        console.log("GPIO: "+ GPIOs[i].GPIO +"output");
        GPIO.setup(GPIOs[i].GPIO, GPIO.DIR_OUT, function(err){
          if (err) {
            console.log("Error opening pin " + err);
            return;
          }
        });
      }else if(GPIOs[i].tipo==="input"){
        console.log("GPIO: "+ GPIOs[i].GPIO +"input");
        GPIO.setup(GPIOs[i].GPIO, GPIO.DIR_IN, GPIO.EDGE_BOTH);
      }
    }
  });
};

gpio.unexportPins = function() {
  GPIO.destroy(function() {
    console.log('All pins unexported');
    process.exit();
  });
};

module.exports = gpio;
