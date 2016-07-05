var express = require('express');
var User = require('../models/user');
var anonymous = {
    block: true,
    permission: 100,
    username: "anonymous",
    firstname: "Anonymous"
  };

exports.authentication = function(req, res, next) {
  if(req.headers.authorization) {
    var base64 = req.headers.authorization.split(' ');
    var parameters = new Buffer(base64[1], 'base64').toString('ascii').split(':');
    User.findOne({
      'username': parameters[0],
      'password': parameters[1]
    }, function(err, user) {
      if(user) {
        req.user = user;
      } else {
        req.user = anonymous;
      }
      next();
    });
  }else {
    req.user = anonymous;
    next();
  }
}

exports.addAPIRouter = function(app, mongoose) {

  var router = express.Router();

 	router.get('/', function(req, res) {
    debugger;
    if(req.user.block === false && req.user.permission === 0) {
      User.find(function(err, users) {
        if(err) {
          res.status(500).send({msg: err.errmsg});
        } else if(users && users.length>0) {
          res.status(200).send(users);
        } else {
          res.status(404).send([]);
        }
      });
    } else {
      res.status(401).send({msg: 'Authorization required'})
    }
 	});

  router.post('/', function(req, res) {
    if(req.body.firstname && req.body.lastname && req.body.username && req.body.password) {
      var newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
      });
      newUser.save(function (err) {
        if(err) {
          debugger;
          if(err.code === 11000) {
            res.status(400).send({msg: "duplicate username"});
          } else {
            res.status(500).send({msg: err.errmsg});
          }
        } else {
          res.status(201).send({'msg': 'ok'});
        }
      });
    } else {
      res.status(400).send({'msg': 'missing data'})
    }
 	});

  router.post('/check_username', function(req, res) {
    User.findOne({
      'username': req.body.username,
    }, function(err, user) {
      if(err) {
        debugger;
        res.status(500).send({'msg': err.errmsg});
      } else if(user) {
        res.status(200).send({'msg': 'Exist'});
      } else {
        res.status(404).send({'msg': 'Does not exist'});
      }
    });
 	});

  router.post('/login', function(req, res) {
    if(req.body.username && req.body.password) {
      User.findOne({
        'username': req.body.username,
        'password': req.body.password
      }, 'block username firstname lastname permission photo theme',function(err, user) {
        if(err) {
          res.status(500).send({'msg': err});
        } else if(user) {
          res.status(200).send(user);
        } else {
          res.status(400).send({'msg': 'Fail'});
        }
      });
    } else {
      res.status(400).send({'msg': 'Fail'});
    }
 	});

  router.get('/:username', function(req, res) {
    if(req.user.block === false && (req.user.permission === 0 || req.user.username === req.params.username )) {
      User.findOne({
        'username': req.params.username
      }, function(err, user) {
        if(err) {
          res.status(500).send({'msg': err.msg});
        } else if(user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({'msg': 'Not found'});
        }
      });
    } else {
      res.status(401).send({msg: 'Authorization required'});
    }
 	});

  router.put('/:username', function(req, res) {
    if(req.user.block === false && (req.user.permission === 0 || req.user.username === req.params.username )) {
      User.findOne({
        'username': req.params.username
      }, function(err, user) {
        if(err) {
          res.status(500).send({'msg': err.msg});
        } else if(user) {
          user.firstname = req.body.firstname || user.firstname;
          user.lastname = req.body.lastname || user.lastname;
          user.photo = req.body.photo || user.photo;
          user.theme = req.body.theme || user.theme;
          user.password = req.body.password || user.password;
          user.permission = req.body.permission || user.permission;
          //Admin can not block itself
          if(req.user.username !== req.params.username) {
            if(undefined != req.body.block) {
              user.block = req.body.block;
            }
          }
          user.save(function (err) {
            if(err) {
              res.status(500).send({msg: err.errmsg});
            } else {
              res.status(200).send(user);
            }
          });
        } else {
          res.status(404).send({'msg': 'Not found'});
        }
      });
    } else {
      res.status(401).send({msg: 'Authorization required'});
    }
 	});
  app.use('/api/v2.0/user', router);
}
