//Oggetto beacon
var beacons = {};

beacons.beacons = function (req, res) {
  console.log('beacons request');
  res.status(200).send(req.beacons);
};

beacons.beacons_registrabili = function (req, res) {
  console.log('beacons registrabili request');
  var beacons = [];
  debugger;
  for(var i = 0; i < req.beacons.length; i++) {
    if(req.beacons[i].stato === 1) {
      beacons.push(req.beacons[i]);
    }
  }
  res.status(200).send(beacons);
};

beacons.beacon = function (req, res) {
  var trovato = -1;
  var i = 0;
  console.log('beacon request');
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
};

beacons.elimina_beacon = function (req, res, next) {
  var trovato = -1;
  var i = 0;
  console.log('delete beacon request');
  while(trovato===-1 && i<req.beacons.length) {
    if(req.beacons[i].id===parseInt(req.body.id)) {
      trovato = i;
      req.beacons[i].stato = 2;
    }
    i++;
  }
  next();
  res.status(200).send({"status":"1","beacons":req.beacons});
};

beacons.aggiungi_beacon = function (req, res, next) {
  console.log('add beacon request');
  var beacon = {};
  beacon.id = Date.now();
  beacon.uuid = req.body.uuid;
  beacon.major = req.body.major;
  beacon.minor = req.body.minor;
  beacon.stato = 1;
  req.beacons.push(beacon);
  res.status(200).send(req.beacons);
  next();
};

module.exports = beacons;
