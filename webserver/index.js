var fs = require('fs');
var express = require('express');
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
      caratteristiche: null
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

//catches ctrl+c event
process.on('SIGINT', function(){
     console.log("Stop webserver");
     process.exit();
});


app.listen(SERVERPORT);
console.log('Server listening on port ' + SERVERPORT);
