var express = require('express');
var Device = require('../models/device');
var Beacon = require('../models/beacon');
var GPIO = require('../models/gpio')
var pin = require('../services/gpio');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    Device.find(function(err, devices) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(devices && devices.length>0) {
        res.status(200).send(devices);
      } else {
        res.status(200).send([]);
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
    Device.find({_GPIO:{$ne: null}})
      .populate('_GPIO')
      .exec(function (err, devices) {
      if(err) {
        debugger;
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
    Device.findById(req.params.id, function(err, device) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(device) {
        device.name = req.body.name || device.name;
        device.description = req.body.description || device.description;
        device._GPIO = req.body._GPIO || device.id_GPIO;
        device._beacon = req.body._beacon || device.id_beacon;
        device.properties = req.body.properties || device.properties;
        if(undefined != req.body.automatic) {
          device.automatic = req.body.automatic;
        }
        device.save(function (err) {
          if(err) {
            res.status(500).send({msg: err.errmsg});
          } else {
            res.status(200).send(device);
          }
        });
      } else {
        res.status(404).send([]);
      }
    });
 	});

  router.put('/:id/on', function(req, res) {
    Device.findById(req.params.id)
      .exec(function(err, device) {
        if(err) {
          res.status(500).send({msg: err.errmsg});
        } else if(device) {
          GPIO.update({_id: device._GPIO}, {value: true}, {}, function (err, ok) {
            if(err) {
              res.status(500).send({msg: err.errmsg});
            } else {
              pin.setPin(device._GPIO.GPIO, true, function(err) {
                if (err) {
                  res.status(500).send('Oops, Something went wrong! ' + err);
                } else {
                  res.status(200).send({'msg':'ok'});
                }
              });
            }
          });
        } else {
          res.status(404).send([]);
        }
      });
    });

    router.put('/:id/off', function(req, res) {
      Device.findById(req.params.id)
        .populate('_GPIO')
        .exec(function(err, device) {
          if(err) {
            res.status(500).send({msg: err.errmsg});
          } else if(device) {
            GPIO.update({_id: device._GPIO}, {value: false}, {}, function (err, ok) {
              if(err) {
                res.status(500).send({msg: err.errmsg});
              } else {
                pin.setPin(device._GPIO.GPIO, false, function(err) {
                  if (err) {
                    res.status(500).send('Oops, Something went wrong! ' + err);
                  } else {
                    res.status(200).send({'msg':'ok'});
                  }
                });
              }
            });
          } else {
            res.status(404).send([]);
          }
        });
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
