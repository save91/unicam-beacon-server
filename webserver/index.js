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

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
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
