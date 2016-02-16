var fs = require('fs');
var express = require('express');
var gpio = require('rpi-gpio');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var USERS_FILE = ("json/users.json");
var BEACONS_FILE = ("json/beacons.json");
var DISPOSITIVI_FILE = ("json/dispositivi.json");
var IO_FILE = ("json/io.json");
var GPIO_FILE = ("json/gpio.json");
var SERVERPORT = 8000;


app.post('/login', function (req, res) {
  console.log('login request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    var pos = -1;
    for(var i = 0;i<users.length;i++) {
      if(users[i].username === req.body.username && users[i].psw === req.body.password) {
        pos = i;
        i = users.length;
      }
    }
    if(pos>=0) {
      res.status(200).send({
        nome: users[pos].nome,
        cognome: users[pos].cognome,
        permessi: users[pos].permessi,
        username: users[pos].username
      });
    }else {
      res.status(500).send("Errore nel login");
    }
  })

});

app.get('/utenti', function (req, res) {
  console.log('users request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    res.status(200).send(users);
  });
});

app.post('/utente', function (req, res) {
  var users = [];
  var trovato = -1;
  var i = 0;
  console.log('user request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    while(trovato===-1 && i<users.length) {
      if(users[i].username===req.body.username) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      res.status(200).send(users[trovato]);
    } else {
      res.status(404).send('User not found.');
    }
  });
});

app.post('/aggiorna_utente', function (req, res) {
  var users = [];
  var trovato = -1;
  var i = 0;
  console.log('user request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    while(trovato===-1 && i<users.length) {
      if(users[i].username===req.body.username) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      users[trovato].nome = req.body.nome;
      users[trovato].cognome = req.body.cognome;
      users[trovato].permessi = req.body.permessi;
      users[trovato].bloccato = req.body.bloccato;
      fs.writeFile(USERS_FILE, JSON.stringify(users, null), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.status(200).send(users[trovato]);
      });
    } else {
      res.status(500).send('Oops, Something went wrong!');
    }
  });
});

app.get('/beacons', function (req, res) {
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

app.post('/beacon', function (req, res) {
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

app.post('/elimina_beacon', function (req, res) {
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

app.get('/io', function (req, res) {
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

app.get('/gpio', function (req, res) {
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

app.post('/gpio_set', function (req, res) {
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

app.post('/gpio_edit', function (req, res) {
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

app.post('/dispositivo_edit_ibeacon', function (req, res) {
  console.log('edit dispositivo request');
  var id_dispositivo = parseInt(req.body.id_dispositivo);
  var id_ibeacon = parseInt(req.body.id_ibeacon);
  associa_iBeacon(id_dispositivo, id_ibeacon, res);

});

app.post('/gpio_get', function (req, res) {
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

app.post('/dispositivo', function (req, res) {
  console.log('dispositivo request');
  var i = 0;
  var trovato = -1;
  var id = parseInt(req.body.id);
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var dispositivi = JSON.parse(data);
    while(trovato===-1 && i<GPIOs.length) {
      if(dispositivi[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      res.status(200).send(dispositivi[trovato]);
    }
  });
});

app.post('/salva_dispositivo', function (req, res) {
  var dispositivi = [];
  var trovato = -1;
  var i = 0;
  var id = parseInt(req.body.id);
  var automatico;
  if(req.body.automatico === "true" || req.body.automatico === true) {
    automatico = true;
  }else {
    automatico = false;
  }
  console.log('delete dispositivo request');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dispositivi = JSON.parse(data);
    while(trovato===-1 && i<dispositivi.length) {
      debugger;
      if(dispositivi[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      dispositivi[trovato].automatico = automatico;
    }
    fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(dispositivi, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(200).send({"status":"1","dispositivi":dispositivi});
    });
  });
});

app.get('/dispositivi', function (req, res) {
  console.log('dispositivi request');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var dispositivi = JSON.parse(data);
    res.status(200).send(dispositivi);
  });
});

app.get('/dispositivi_output', function (req, res) {
  console.log('dispositivi output request');

  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    debugger;
    var dispositivo = {};
    var dispositivi = JSON.parse(data);
    var ibeacons = JSON.parse(data);
    var dispositivi_output = [];
    var j = 0;
    var trovato;
    for(var i = 0; i < dispositivi.length; i++) {
      if(dispositivi[i].io === "output" && dispositivi[i].id_GPIO !== 0) {
        dispositivo = {};
        dispositivo.nome = dispositivi[i].nome;
        dispositivo.descrizione = dispositivi[i].descrizione;
        dispositivo.stato = dispositivi[i].stato;
        dispositivo.distanza = "far";
        dispositivo.automatico = dispositivi[i].automatico;
        dispositivo.disabilitato = dispositivi[i].id_ibeacon;
        dispositivo.uuid = 0;
        dispositivo.major = 0;
        dispositivo.minor = 0;
        j = 0;
        trovato = -1;
        while(trovato === -1 && j < ibeacons.length) {
          if(ibeacons[j].id === dispositivi[i].id_ibeacon) {
            trovato = 1;
            dispositivo.uuid = ibeacons[j].caratteristiche.uuid;
            dispositivo.major = ibeacons[j].caratteristiche.major;
            dispositivo.minor = ibeacons[j].caratteristiche.minor;
          }
          j++;
        }
        dispositivo.id_GPIO = dispositivi[i].id_GPIO;
        dispositivi_output.push(dispositivo);
      }
    }
    res.status(200).send(dispositivi_output);
  });
});

app.post('/aggiungi_dispositivo', function (req, res) {
  console.log('add dispositivo request');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var dispositivi = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newDispositivo = {
      id: Date.now(),
      type: req.body.type,
      io: req.body.io,
      nome: req.body.nome,
      descrizione: req.body.descrizione,
      permessi: " ",
      id_GPIO: 0,
      id_ibeacon: 0,
      caratteristiche: req.body.caratteristiche
    }
    dispositivi.push(newDispositivo);
    fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(dispositivi, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(200).send({status: "1", dispositivi: dispositivi});
    });
  });
});

app.post('/elimina_dispositivo', function (req, res) {
  var dispositivi = [];
  var trovato = -1;
  var i = 0;
  var id = parseInt(req.body.id);
  console.log('delete dispositivo request');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dispositivi = JSON.parse(data);
    while(trovato===-1 && i<dispositivi.length) {
      debugger;
      if(dispositivi[i].id===id) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      dispositivi.splice(trovato,1);
    }
    fs.writeFile(DISPOSITIVI_FILE, JSON.stringify(dispositivi, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(200).send({"status":"1","dispositivi":dispositivi});
    });
  });
});

app.post('/blocca_utente', function (req, res) {
  console.log('block user request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var utenti = JSON.parse(data);
    //Mettere ciclo while
    for(var i = 0; i < utenti.length; i++) {
      if(utenti[i].username===req.body.username) {
        utenti[i].bloccato = true;
      }
    }
    fs.writeFile(USERS_FILE, JSON.stringify(utenti, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    res.status(200).send(utenti);
    });
  });
});

app.post('/sblocca_utente', function (req, res) {
  console.log('block user request');
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var utenti = JSON.parse(data);
    //Mettere ciclo while
    for(var i = 0; i < utenti.length; i++) {
      if(utenti[i].username===req.body.username) {
        utenti[i].bloccato = false;
      }
    }
    fs.writeFile(USERS_FILE, JSON.stringify(utenti, null), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    res.status(200).send(utenti);
    });
  });
});

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
