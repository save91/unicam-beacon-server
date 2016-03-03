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

beacons.beacon = function (req, res) {
  var pos = -1;
  var i = 0;
  if(req.user.block === false) {
    while(pos === -1 && i < req.beacons.length) {
      if(req.beacons[i].id === parseInt(req.params.id)) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      res.status(200).send(req.beacons[pos]);
    } else {
      res.status(404).send('Beacon not found.');
    }
  } else {
    res.status(401).send("Authentication required");
  }
};

beacons.delete_beacon = function (req, res, next) {
  var pos = -1;
  var i = 0;
  if(req.user.permission === 0 && req.user.block === false) {
    while(pos === -1 && i < req.beacons.length) {
      if(req.beacons[i].id === parseInt(req.params.id)) {
        pos = i;
        req.beacons[i].state = 2;
      }
      i++;
    }
    if(pos >= 0) {
      next();
      res.status(200).send("Success");
    } else {
      res.status(404).send("Beacon not found");
    }
  } else {
    res.status(401).send("Authentication required");
  }
};

beacons.add_beacon = function (req, res, next) {
  if(req.user.block === false) {
    var beacon = {};
    beacon.id = Date.now();
    beacon.uuid = req.body.uuid;
    beacon.major = req.body.major;
    beacon.minor = req.body.minor;
    beacon.state = 1;
    req.beacons.push(beacon);
    res.status(200).send("Success");
    next();
  } else {
    res.status(401).send("Authorization required");
  }
};

module.exports = beacons;
