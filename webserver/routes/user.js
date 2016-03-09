//Object user
users = {};

users.authentication = function (req, res, next) {
  var pos = -1;
  var i = 0;
  if(req.headers.authorization) {
    var base64 = req.headers.authorization.split(' ');
    var parameters = new Buffer(base64[1], 'base64').toString('ascii').split(':');
    while(pos === -1 && i<req.users.length) {
      if(parameters[0] === req.users[i].username && parameters[1] === req.users[i].password) {
        pos = i;
        req.user = req.users[i];
      }
      i++;
    }
    if(req.user) {
      console.log("User: ", req.user.username );
    }
  }
  if(pos === -1) {
    req.user = {
      id: 0,
      username: "anonymous",
      firstname: "Anonymous",
      permission: 100,
      block: true
    }
    console.log("User: anonymous");
  }
  next();
}

users.login = function (req, res) {
  var pos = -1;
  debugger;
  for(var i = 0;i<req.users.length;i++) {
    if(req.users[i].username === req.body.username && req.users[i].password === req.body.password) {
      pos = i;
      i = req.users.length;
    }
  }
  if(pos>=0) {
    //Remove password
    res.status(200).send({
      username: req.users[pos].username,
      firstname: req.users[pos].firstname,
      lastname: req.users[pos].lastname,
      permission: req.users[pos].permission,
      block: req.users[pos].block
    });
  }else {
    res.status(400).send("Error");
  }
};

users.users = function (req, res) {
  if(req.user.block === false && req.user.permission === 0) {
    res.status(200).send(req.users);
  } else {
    res.status(401).send("Authorization required");
  }
};

users.check_username = function (req, res) {
  var i = 0;
  var found = false;
  while(found === false && i < req.users.length) {
    if(req.users[i].username === req.body.username) {
      found = true;
    }
    i++;
  }
  if(found) {
    res.status(403).send("The username exist");
  } else {
    res.status(200).send("The username does not exist");
  }
};

users.user = function (req, res) {
  var pos = -1;
  var i = 0;
  while(pos===-1 && i<req.users.length) {
    if(req.users[i].username===req.params.username) {
      pos = i;
    }
    i++;
  }
  if(pos>=0 && ((req.user.block === false && req.user.permission === 0) || req.user.username === req.users[pos].username)) {
    res.status(200).send(req.users[pos]);
  } else {
    res.status(404).send('User not found.');
  }
};

users.update_user = function (req, res, next) {
  if(req.user.block === false && req.user.permission === 0) {
    var pos = -1;
    var i = 0;
    while(pos===-1 && i<req.users.length) {
      if(req.users[i].username===req.params.username) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      req.users[pos].firstname = req.body.firstname;
      req.users[pos].lastname = req.body.lastname;
      req.users[pos].permission = req.body.permission;
      if(req.body.block === "true" || req.body.block === true) {
        req.users[pos].block = true;
      } else {
        req.users[pos].block = false;
      }
      res.status(200).send(req.users[pos]);
      next();
    } else {
      res.status(404).send('User not found');
    }
  }else {
    res.status(401).send('Authentication required');
  }
};

users.add_user = function (req, res, next) {
  var user = {}
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.password = req.body.password;
  user.permission = 10;
  user.block = true;
  req.users.push(user);
  res.status(201).send("Success");
  next();
};

module.exports = users;
