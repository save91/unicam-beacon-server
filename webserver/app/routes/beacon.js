var express = require('express');
var Beacon = require('../models/beacon');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    Beacon.find(function(err, beacons) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacons && beacons.length>0) {
        res.status(200).send(beacons);
      }
    });
 	});

  router.post('/', function(req, res) {
    var newBeacon = new Beacon({
      uuid: req.body.uuid,
      major: req.body.major,
      minor: req.body.minor
    });
    newBeacon.save(function (err) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else {
        res.status(201).send({'msg': 'ok'});
      }
    });
 	});

  router.get('/unregistered', function(req, res) {
    Beacon.find({state: 0}, function(err, beacons) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacons && beacons.length>0) {
        res.status(200).send(beacons);
      }
    });
 	});

  router.get('/:id', function(req, res) {
    Beacon.findById(req.params.id, function(err, beacon) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacon) {
        res.status(200).send(beacon);
      } else {
        res.status(404).send([]);
      }
    });
 	});

  router.delete('/:id', function(req, res) {
    Beacon.findById(req.params.id, function(err, beacon) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacon) {
        beacon.state = 2;
        beacon.save(function (err) {
          if(err) {
            res.status(500).send({msg: err.errmsg});
          } else {
            res.status(201).send({'msg': 'ok'});
          }
        });
      }
    });
 	});

  app.use('/api/v2.0/beacon', router);
}
