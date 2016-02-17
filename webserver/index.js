var fs = require('fs');
var express = require('express');
var gpio = require('rpi-gpio');
var cors = require('cors');
var bodyParser = require('body-parser');
var router_dispositivi = require('./routes/dispositivi');
var router_utenti = require('./routes/utenti');
var router_ibeacons = require('./routes/ibeacons');
var router_gpio = require('./routes/gpio');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/dispositivi', router_dispositivi);
app.use('/utenti', router_utenti);
app.use('/ibeacons', router_ibeacons);
app.use('/gpio', router_gpio);

var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DISPOSITIVI_FILE = ("json/dispositivi.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");
var SERVERPORT = 8000;

// Express routes for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

app.post('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

function associa_GPIO(id_GPIO, id_dispositivo) {
  var trovato = -1;
  var i = 0;
  fs.readFile(GPIO_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    GPIOs = JSON.parse(data);
    while(trovato === -1 && i < GPIOs.length) {
      if(GPIOs[i].id === id_GPIO) {
        GPIOs[i].id_dispositivo = id_dispositivo;
        trovato = i;
      }
      i++;
    }
    fs.writeFile(GPIO_FILE, JSON.stringify(GPIOs, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
}

function associa_iBeacon(id_dispositivo, id_ibeacon, res) {
  var trovato = -1;
  var i = 0;
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dispositivi = JSON.parse(data);
    while(trovato === -1 && i < dispositivi.length) {
      if(dispositivi[i].id === id_dispositivo) {
        dispositivi[i].id_ibeacon = id_ibeacon;
        trovato = i;
      }
      i++;
    }
    fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(dispositivi, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
        res.status(200).send({status:"1", dispositivi: dispositivi});
    });
  });
}

function associa_dispositivo(id_dispositivo, id_GPIO) {
  var trovato = -1;
  var dispositivi = [];
  var i = 0;
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dispositivi = JSON.parse(data);
    debugger;
    while(trovato === -1 && i < dispositivi.length) {
      if(dispositivi[i].id === id_dispositivo) {
        associa_GPIO(dispositivi[i].id_GPIO,0);
        dispositivi[i].id_GPIO = id_GPIO;
        trovato = i;
      }
      i++;
    }
    fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(dispositivi, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

}

function unexportPins() {
  gpio.destroy(function() {
    console.log('All pins unexported');
    process.exit();
  });
}

//catches ctrl+c event
process.on('SIGINT', function(){
     console.log("Stop webserver");
     unexportPins();
});

//Main
fs.readFile(GPIO_FILE, function(err, data) {
  var GPIOs = [];
  if (err) {
    console.error(err);
    process.exit(1);
  }
  GPIOs = JSON.parse(data);
  for(var i=0;i<GPIOs.length;i++) {
   if(GPIOs[i].tipo==="output") {
    gpio.setup(GPIOs[i].GPIO, gpio.DIR_OUT, function(err){
      if (err) {
        console.log("Error opening pin " + err);
        return;
      }
    });
  }else if(GPIOs[i].tipo==="input"){
    gpio.setup(GPIOs[i].GPIO, gpio.DIR_IN, function(err){
      if (err) {
        console.log("Error opening pin " + err);
        return;
      }
    });
  }
  }
});

app.listen(SERVERPORT);
console.log('GPIO setup completed and server listening on port ' + SERVERPORT);
