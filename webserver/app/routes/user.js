var express = require('express');

exports.addAPIUser = function(app) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    res.status(200).send({'mesage': '/user:get'});
 	});

  router.post('/', function(req, res) {
    res.status(200).send({'mesage': '/user:post'});
 	});

  router.post('/login', function(req, res) {
    res.status(200).send({'mesage': '/user/login:post'});
 	});

  router.post('/check_username', function(req, res) {
    res.status(200).send({'mesage': '/user/check_username:post'});
 	});

  router.get('/:username', function(req, res) {
    res.status(200).send({'mesage': '/user/:username:get'});
 	});

  router.put('/:username', function(req, res) {
    res.status(200).send({'mesage': '/user/:username:get'});
 	});
  app.use('/api/v2.0/user', router);
}
