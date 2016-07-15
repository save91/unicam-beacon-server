var RPI_GPIO = require('rpi-gpio');
var GPIO = require('../models/gpio');
var Device = require('../models/device');
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
    debugger;
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
        GPIO.findOne({
          'GPIO': channel
        }, function(err, result) {
            result.value = value;
            result.save();
            if(value === false) {
              Device.find({
                '_GPIO': result._id
              })
              .populate('_Output')
              .exec(function(err, devices) {
                for(var i = 0; i<devices.length;i++) {
                  if(devices[i]._Output !== null) {
                    GPIO.findOne({
                      '_id': devices[i]._Output._GPIO
                    }, function(err, res) {
                      debugger;
                      if(res) {
                        res.value = !res.value;
                        res.save();
                        gpio.setPin(res.GPIO, res.value, function() {}, environment);
                      }
                    });
                  }
                }
              });
            }
        });
    });
  }
  GPIO.update({type: 'output'},
        {value: false},
        {multi: true},
      function(err, numAffected) {});
  GPIO.update({type: 'input'},
        {value: true},
        {multi: true},
      function(err, numAffected) {});
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
