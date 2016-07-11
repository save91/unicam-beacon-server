var express = require('express');
var GPIO = require('../models/gpio');
var pin = require('../services/gpio');

exports.addAPIRoutes = function(app, environment) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    if(req.user.block || req.user.permission !== 0) {
      res.status(403).send({'msg':'Forbidden'});
    } else {
      GPIO.find(function(err, GPIOs) {
        if(err) {
          res.status(500).send({msg: err.errmsg});
        } else if(GPIOs) {
          res.status(200).send(GPIOs);
        }
      });
    }
 	});

  router.put('/:id/set', function(req, res) {
    if(req.user.block || req.user.permission !== 0) {
      res.status(403).send({'msg':'Forbidden'});
    } else {
      GPIO.findOne({
        '_id': req.params.id,
        'type':'output'
      }, function(err, gpio) {
        if(err) {
          res.status(500).send({'msg': err.msg});
        } else if(gpio) {
          if(undefined != req.body.value) {
            gpio.value = req.body.value;
          }
          gpio.save(function (err) {
            if(err) {
              res.status(500).send({msg: err.errmsg});
            } else {
              pin.setPin(gpio.GPIO, gpio.value, function(err) {
                if (err) {
                  res.status(500).send('Oops, Something went wrong! ' + err);
                } else {
                  res.status(200).send(gpio);
                }
              }, environment);
            }
          });
        } else {
          res.status(404).send({'msg': 'Not found'});
        }
      });
    }
 	});

  app.use('/api/v2.0/gpio', router);
}
