var RPI_GPIO = require('rpi-gpio');
var GPIO = require('../models/gpio');
var gpio = {};

gpio.readStatus = function(PIN, callback) {
  console.log("reading pin "+PIN);
  GPIO.read(PIN, function(err,value) {
    if (err) {
      console.log("error reading pin " + err, null);
      callback("error reading pin " + err, null);
      return;
    }
    callback(null,value);
  });
};

gpio.setPin = function(pin, value, callback, environment) {
  console.log("Setting pin "+pin+" to " + value);
  if(environment !== 'development') {
    RPI_GPIO.write(pin, value, function(err) {
      if (err) {
        console.log("error writing " + err);
        callback("error writing " + err);
        return;
      }
      callback();
    });
  } else {
    callback();
  }
};

gpio.init = function (environment) {
  if(environment !== 'development') {
    RPI_GPIO.on('change', function(channel, value) {
      console.log('Channel ' + channel + ' value is now ' + value);
    });
  }
  GPIO.find(function(err, GPIOs) {
    if(err) {
      console.log(err.errmsg);
    } else if(GPIOs) {
      for(var i=0;i<GPIOs.length;i++) {
        if(GPIOs[i].type==="output") {
          console.log("GPIO: "+ GPIOs[i].GPIO +" output");
          if(environment !== 'development') {
            RPI_GPIO.setup(GPIOs[i].GPIO, RPI_GPIO.DIR_OUT, function(err){
              if (err) {
                console.log("Error opening pin " + err);
                return;
              }
            });
          }
        }else if(GPIOs[i].type==="input"){
          console.log("GPIO: "+ GPIOs[i].GPIO +" input");
          if(environment !== 'development') {
            RPI_GPIO.setup(GPIOs[i].GPIO, RPI_GPIO.DIR_IN, RPI_GPIO.EDGE_BOTH);
          }
        }
      }
    }
  });
};

gpio.unexportPins = function(environment) {
  if(environment !== 'development') {
    RPI_GPIO.destroy(function() {
      console.log('All pins unexported');
      process.exit();
    });
  } else {
    process.exit();
  }
};

module.exports = gpio;
