var express = require('express');
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

router.get('/beacons', function (req, res) {
  console.log('beacons request');
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var beacons = JSON.parse(data);
    res.status(200).send(beacons);
  });
});

router.post('/beacon', function (req, res) {
  var beacons = [];
  var trovato = -1;
  var i = 0;
  console.log('beacon request');
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var beacons = JSON.parse(data);
    while(trovato===-1 && i<beacons.length) {
      if(beacons[i].id===req.body.id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      res.status(200).send({status: "1", beacon : beacons[trovato]});
    } else {
      res.status(404).send('Beacon not found.');
    }
  });
});

router.post('/elimina_beacon', function (req, res) {
  var beacons = [];
  var trovato = -1;
  var i = 0;
  console.log('delete beacon request');
  fs.readFile(BEACONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    beacons = JSON.parse(data);
    while(trovato===-1 && i<beacons.length) {
      if(beacons[i].id===req.body.id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      beacons.splice(trovato,1);
    }
    fs.writeFile(BEACONS_FILE, JSON.stringify(beacons, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(200).send({"status":"1","beacons":beacons});
    });
  });
});

//Fine metodi da convertiti

module.exports = router;
