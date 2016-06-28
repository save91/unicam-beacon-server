var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/hello', function(req, res) {
    res.status(200).send({'mesage': '/setting/hello:get'});
 	});

  router.get('/io', function(req, res) {
    res.status(200).send({'mesage': '/setting/io:get'});
 	});

  app.use('/api/v2.0/setting', router);
}
