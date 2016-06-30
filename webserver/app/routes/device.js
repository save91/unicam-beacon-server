var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    res.status(200).send({'msg': '/device:get'});
 	});

  router.post('/', function(req, res) {
    res.status(200).send({'msg': '/device:post'});
 	});

  router.post('/ibeacon', function(req, res) {
    res.status(200).send({'msg': '/device/ibeacon:post'});
 	});

  router.get('/output', function(req, res) {
    res.status(200).send({'msg': '/device/output:get'});
  });

  router.get('/:id', function(req, res) {
    res.status(200).send({'msg': '/device/:id:post'});
 	});

  router.put('/:id', function(req, res) {
    res.status(200).send({'msg': '/device/:id:put'});
 	});

  router.delete('/:id', function(req, res) {
    res.status(200).send({'msg': '/device/:id:delete'});
 	});

  app.use('/api/v2.0/device', router);
}
