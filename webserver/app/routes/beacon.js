var express = require('express');
var Beacon = require('../models/beacon');

exports.addAPIRouter = function(app, io) {

  var router = express.Router();

  //Everybody can access to beacon list
 	router.get('/', function(req, res) {
    Beacon.find({},function(err, beacons) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacons && beacons.length>0) {
        res.status(200).send(beacons);
      } else {
        res.status(200).send([]);
      }
    });
 	});

  //User must be logged to add new beacon
  router.post('/', function(req, res) {
    if(req.user.block) {
      res.status(401).send({'msg': 'Authentication required'});
    } else if(!req.body.uuid || !req.body.major || !req.body.minor){
      res.status(400).send({'msg': 'Missing data'});
    } else {
      var newBeacon = new Beacon({
        uuid: req.body.uuid,
        major: req.body.major,
        minor: req.body.minor
      });
      newBeacon.save(function (err) {
        if(err) {
          res.status(500).send({msg: err.errmsg});
        } else {
          io.emit("update:beacon");
          res.status(201).send({'msg': 'ok'});
        }
      });
    }
 	});

  //Everybody can access to beacon list
  router.get('/unregistered', function(req, res) {
    Beacon.find({state: 1}, function(err, beacons) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacons && beacons.length>0) {
        res.status(200).send(beacons);
      } else {
        res.status(200).send([]);
      }
    });
 	});

  //Everybody can access to beacon
  router.get('/:id', function(req, res) {
    Beacon.findById(req.params.id, function(err, beacon) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacon) {
        res.status(200).send(beacon);
      } else {
        res.status(404).send({});
      }
    });
	});

  //Only admin can delete beacon
  router.delete('/:id', function(req, res) {
    if(req.user.block || req.user.permission !== 0) {
      res.status(403).send({'msg':'Forbidden'});
    } else {
      Beacon.findById(req.params.id, function(err, beacon) {
        if(err) {
          res.status(500).send({msg: err.errmsg});
        } else if(beacon) {
          beacon.state = 2;
          beacon.save(function (err) {
            if(err) {
              res.status(500).send({msg: err.errmsg});
            } else {
              io.emit("update:beacon");
              res.status(201).send({'msg': 'ok'});
            }
          });
        }
      });
    }
 	});

  app.use('/api/v2.0/beacon', router);
}
