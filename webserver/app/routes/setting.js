var exec = require('child_process').exec;
var express = require('express');

exports.addAPIRouter = function(app, io) {

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
    if(req.user.block || req.user.permission !== 0) {
      res.status(403).send({'msg':'Forbidden'});
    } else {
      exec("halt", function (error, stdout, stderr) {
        if (error !== null) {
          res.status(403).send({'msg': "permesso negato"});
        } else {
          res.status(200).send({'msg': "halt"});
        }
      });
    }
 	});

  router.get('/reboot', function(req, res) {
    if(req.user.block || req.user.permission !== 0) {
      res.status(403).send({'msg':'Forbidden'});
    } else {
      exec("reboot", function (error, stdout, stderr) {
        if (error !== null) {
          res.status(403).send({"msg":"permesso negato"});
        } else {
          res.status(200).send({"msg":"reboot"});
        }
      });
    }
 	});

  app.use('/api/v2.0/setting', router);
}
