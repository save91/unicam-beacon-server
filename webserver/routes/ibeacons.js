//Object beacon
var beacons = {};

beacons.beacons = function (req, res) {
  if(req.user.block === false) {
    res.status(200).send(req.beacons);
  } else {
    res.status(401).send("Authorization required");
  }
};

beacons.unregistered_beacons = function (req, res) {
  if(req.user.block === false) {
    var beacons = [];
    debugger;
    for(var i = 0; i < req.beacons.length; i++) {
      if(req.beacons[i].state === 1) {
        beacons.push(req.beacons[i]);
      }
    }
    res.status(200).send(beacons);
  } else {
    res.status(401).send("Authorizetion required");
  }
};

//solo per utenti attivi
beacons.beacon = function (req, res) {
  var trovato = -1;
  var i = 0;
  console.log('beacon request');
  if(req.user.bloccato === false) {
    while(trovato===-1 && i<req.beacons.length) {
      if(req.beacons[i].id===parseInt(req.body.id)) {
        trovato = i;
      }
      i++;
    }
    if(trovato>=0) {
      res.status(200).send({status: "1", beacon : req.beacons[trovato]});
    } else {
      res.status(404).send('Beacon not found.');
    }
  } else {
    res.status(403).send([]);
  }
};

//Operazione permessa solo agli admin
beacons.elimina_beacon = function (req, res, next) {
  var trovato = -1;
  var i = 0;
  console.log('delete beacon request');
  if(req.user.permessi === "admin" && req.user.bloccato === false) {
    while(trovato===-1 && i<req.beacons.length) {
      if(req.beacons[i].id===parseInt(req.body.id)) {
        trovato = i;
        req.beacons[i].stato = 2;
      }
      i++;
    }
    next();
    res.status(200).send({"status":"1","beacons":req.beacons});
  } else {
    res.status(403).send("Non hai i permessi");
  }
};

beacons.aggiungi_beacon = function (req, res, next) {
  console.log('add beacon request');
  if(req.user.permessi === "admin" && req.user.bloccato === false) {
    var beacon = {};
    beacon.id = Date.now();
    beacon.uuid = req.body.uuid;
    beacon.major = req.body.major;
    beacon.minor = req.body.minor;
    beacon.stato = 1;
    req.beacons.push(beacon);
    res.status(200).send(req.beacons);
    next();
  } else {
    res.status(403).send([]);
  }
};

module.exports = beacons;
