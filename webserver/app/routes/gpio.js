var express = require('express');
var GPIO = require('../models/beacon');

exports.addAPIRoutes = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    GPIO.find(function(err, GPIOs) {
      if(err) {
        res.status(500).send({msg: err.errmsg});
      } else if(GPIOs && GPIOs.length>0) {
        res.status(200).send(GPIOs);
      } else {
        res.status(404).send([]);
      }
    });
 	});

  router.put('/', function(req, res) {
    res.status(200).send({'msg': '/gpio:put'});
 	});

  router.put('/:id/set', function(req, res) {
    res.status(200).send({'msg': '/gpio/:id/set:put'});
 	});

  router.get('/:id', function(req, res) {
    res.status(200).send({'msg': '/gpio/:id:get'});
 	});

  app.use('/api/v2.0/gpio', router);
}
