var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    res.status(200).send({'msg': '/gpio:get'});
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
