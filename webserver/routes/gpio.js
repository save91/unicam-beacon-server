var express = require('express');
var gpio = require('rpi-gpio');
/*
* Soluzione temporanea
*/
var fs = require('fs');
var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DISPOSITIVI_FILE = ("json/dispositivi.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//Metodi da convertire

router.get('/io', function (req, res) {
  console.log('io request');
  fs.readFile(IO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var io = JSON.parse(data);
    res.status(200).send({"status":"1","io":io});
  });
});

router.get('/gpio', function (req, res) {
  console.log('gpio request');

  fs.readFile(GPIO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var GPIOs = JSON.parse(data);
    res.status(200).send({"status":"1","gpio":GPIOs});
  });
});

router.post('/gpio_set', function (req, res) {
  debugger;
  console.log('set gpio request');
  fs.readFile(GPIO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var GPIOs = JSON.parse(data);
    var i = 0;
    var trovato = -1;
    var id = parseInt(req.body.id);
    var val = parseInt(req.body.value);
    while(trovato===-1 && i<GPIOs.length) {
      if(GPIOs[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      setPin(GPIOs[trovato].GPIO, val, function(err) {
        if (err) {
          res.status(500).send('Oops, Something went wrong! ' + err);
        } else {
          GPIOs[trovato].stato = val;
          res.status(200).send({status:"1", gpio: GPIOs});
        }
      })
    }
  });
});

router.post('/gpio_edit', function (req, res) {
  console.log('edit gpio request');
  var id_GPIO = parseInt(req.body.id_gpio);
  var id_dispositivo = parseInt(req.body.id_dispositivo);
  var GPIOs;
  var dispositivi;
  debugger;

  associa_dispositivo(id_dispositivo, id_GPIO);
  associa_GPIO(id_GPIO, id_dispositivo);


  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var dispositivi = JSON.parse(data);
    fs.readFile(GPIO_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var GPIOs = JSON.parse(data);
      res.status(200).send({status:"1"});
    });
  });
});

router.post('/gpio_get', function (req, res) {
  debugger;
  console.log('get gpio request');
  fs.readFile(GPIO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var GPIOs = JSON.parse(data);
    var i = 0;
    var trovato = -1;
    var id = parseInt(req.body.id);
    while(trovato===-1 && i<GPIOs.length) {
      if(GPIOs[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      readStatus(GPIOs[trovato].GPIO, function(err, value) {
        if (err) {
          res.status(500).send('Oops, Something went wrong! ' + err);
        } else {
          GPIOs[trovato].stato = value;
          res.status(200).send({status:"1", gpio: GPIOs});
        }
      })
    }
  });
});
//Fine metodi da convertiti

module.exports = router;

function setPin(pin, value, callback) {
    console.log("Setting pin "+pin+" to " + value);
    gpio.write(pin, value, function(err) {
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
    gpio.read(PIN, function(err,value) {
        if (err) {
                console.log("error reading pin " + err, null);
                callback("error reading pin " + err, null);
                return;
            }
        callback(null,value);
    });
}
