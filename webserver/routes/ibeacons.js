//Oggetto beacon
var beacons = {};

beacons.beacons = function (req, res) {
  console.log('beacons request');
  res.status(200).send(req.beacons);
};

beacons.beacon = function (req, res) {
  var trovato = -1;
  var i = 0;
  console.log('beacon request');
  while(trovato===-1 && i<req.beacons.length) {
    if(req.beacons[i].id===req.body.id) {
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
    if(req.beacons[i].id===req.body.id) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    req.beacons.splice(trovato,1);
    next();
  }
  res.status(200).send({"status":"1","beacons":req.beacons});
};

module.exports = beacons;
