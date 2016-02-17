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
router.post('/dispositivo_edit_ibeacon', function (req, res) {
  console.log('edit dispositivo request');
  var id_dispositivo = parseInt(req.body.id_dispositivo);
  var id_ibeacon = parseInt(req.body.id_ibeacon);
  associa_iBeacon(id_dispositivo, id_ibeacon, res);

});


router.post('/dispositivo', function (req, res) {
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

router.post('/salva_dispositivo', function (req, res) {
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

router.get('/dispositivi', function (req, res) {
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

router.get('/dispositivi_output', function (req, res) {
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

router.post('/aggiungi_dispositivo', function (req, res) {
  console.log('add dispositivo request');
  fs.readFile(DISPOSITIVI_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var dispositivi = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other routerroach (e.g. UUIDs) to ensure a globally unique id. We'll
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

router.post('/elimina_dispositivo', function (req, res) {
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

//Fine metodi da convertiti

module.exports = router;
