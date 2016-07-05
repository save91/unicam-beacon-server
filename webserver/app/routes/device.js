var express = require('express');
var Device = require('../models/device');
var Beacon = require('../models/beacon');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    Device.find(function(err, devices) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(devices && devices.length>0) {
        res.status(200).send(devices);
      }
    });
 	});

  router.post('/', function(req, res) {
    var newDevice = new Device({
      type: req.body.type,
      io: req.body.io,
      name: req.body.name,
      description: req.body.description,
      permission: req.body.permission,
      properties: req.body.properties,
    });
    newDevice.save(function (err) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else {
        res.status(201).send({'msg': 'ok'});
      }
    });
 	});

  router.post('/beacon', function(req, res) {
    Beacon.findById({state: 1}, req.params.id_beacon, function(err, beacon) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(beacon) {
        var query = {_id: req.body.id_device};
        var update = { $set: {id_beacon: req.body.id_beacon}};
        var options = {};
        Device.update(query, update, options, function(err, numAffected) {
          if(err) {
            res.status(500).send({msg: err.errmsg});
          } else if(numAffected > 0) {
            res.status(200).send({msg: 'ok'});
          } else {
            res.status(404).send([]);
          }
        });
      } else {
        res.status(404).send([]);
      }
    });
 	});

  router.get('/output', function(req, res) {
    Device.find({$not: {id_GPIO: null}}, function(err, devices) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(devices && devices.length>0) {
        res.status(200).send(devices);
      } else {
        res.status(404).send([]);
      }
    });
  });

  router.get('/io', function(req, res) {
    res.status(200).send([
      {"id":"1","type":"input","name":"Pulsante"},
      {"id":"2","type":"input","name":"Orologio"},
      {"id":"3","type":"input","name":"Fotocellula"},
      {"id":"4","type":"output","name":"Cancello"},
      {"id":"5","type":"output","name":"Apriporta"},
      {"id":"6","type":"output","name":"Lampada"}]);
  });

  router.get('/:id', function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(device) {
        res.status(200).send(device);
      } else {
        res.status(404).send([]);
      }
    });
 	});

  router.put('/:id', function(req, res) {
    res.status(200).send({'msg': '/device/:id:put'});
 	});

  router.delete('/:id', function(req, res) {
    Device.findByIdAndRemove(req.params.id, {}, function(err, device) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(device) {
        res.status(200).send({msg:'ok'});
      } else {
        res.status(404).send({msg: 'Not Found'});
      }
    });
 	});



  app.use('/api/v2.0/device', router);
}
