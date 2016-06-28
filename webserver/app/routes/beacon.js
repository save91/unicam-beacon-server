var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    res.status(200).send({'mesage': '/beacon:get'});
 	});

  router.post('/', function(req, res) {
    res.status(200).send({'mesage': '/beacon:post'});
 	});

  router.get('/unregistered', function(req, res) {
    res.status(200).send({'mesage': '/beacon/unregistered:get'});
 	});

  router.get('/:id', function(req, res) {
    res.status(200).send({'mesage': '/beacon/:id:get'});
 	});

  router.delete('/:id', function(req, res) {
    res.status(200).send({'mesage': '/beacon/:id:delete'});
 	});

  app.use('/api/v2.0/beacon', router);
}
