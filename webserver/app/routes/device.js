var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    res.status(200).send({'mesage': '/device:get'});
 	});

  router.post('/', function(req, res) {
    res.status(200).send({'mesage': '/device:post'});
 	});

  router.post('/ibeacon', function(req, res) {
    res.status(200).send({'mesage': '/device/ibeacon:post'});
 	});

  router.get('/output', function(req, res) {
    res.status(200).send({'mesage': '/device/output:get'});
  });

  router.get('/:id', function(req, res) {
    res.status(200).send({'mesage': '/device/:id:post'});
 	});

  router.put('/:id', function(req, res) {
    res.status(200).send({'mesage': '/device/:id:put'});
 	});

  router.delete('/:id', function(req, res) {
    res.status(200).send({'mesage': '/device/:id:delete'});
 	});

  app.use('/api/v2.0/device', router);
}
