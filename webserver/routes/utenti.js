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

router.post('/login', function (req, res) {
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

router.get('/utenti', function (req, res) {
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

router.post('/utente', function (req, res) {
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

router.post('/aggiorna_utente', function (req, res) {
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


router.post('/blocca_utente', function (req, res) {
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

router.post('/sblocca_utente', function (req, res) {
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
//Fine metodi da convertiti

module.exports = router;
