var exec = require('child_process').exec;
var express = require('express');

exports.addAPIRouter = function(app) {

  var router = express.Router();

 	router.get('/hello', function(req, res) {
    var response = {
      port: "8000",
      name: "ProximitySystem",
      version: "2.0"
    };
    res.status(200).send(response);
 	});

  router.get('/halt', function(req, res) {
    exec("halt", function (error, stdout, stderr) {
      if (error !== null) {
        res.status(403).send({'msg': "permesso negato"});
      } else {
        res.status(200).send({'msg': "halt"});
      }
    });
 	});

  router.get('/reboot', function(req, res) {
    exec("reboot", function (error, stdout, stderr) {
      if (error !== null) {
        res.status(403).send({"permesso negato"});
      } else {
        res.status(200).send({"reboot"});
      }
    });
 	});

  router.get('/exit', function(req, res) {
    res.status(200).send({'msg': 'exit'});
 	});

  router.get('/update', function(req, res) {
    res.status(200).send({'msg': 'update'});
 	});

  app.use('/api/v2.0/setting', router);
}
