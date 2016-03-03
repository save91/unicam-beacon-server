var devices = {};

devices.device_ibeacon = function (req, res, next) {
  if(req.user.permission === 0 && req.user.block === false) {
    var id_device = parseInt(req.body.id_device);
    var id_ibeacon = parseInt(req.body.id_ibeacon);
    var pos = -1;
    var i = 0;
    while(pos === -1 && i < req.devices.length) {
      if(req.devices[i].id === id_device) {
        req.devices[i].id_ibeacon = id_ibeacon;
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      res.status(200).send("Success");
      next();
    } else {
      res.status(404).send("Device not found");
    }
  } else {
    res.status(403).send("Authorization required");
  }
};

devices.device = function (req, res) {
  if(req.user.block === false) {
    var i = 0;
    var pos = -1;
    var id = parseInt(req.params.id);
    while(pos===-1 && i<req.devices.length) {
      if(req.devices[i].id===id) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      res.status(200).send(req.devices[pos]);
    } else {
      res.status(404).send("Device not found");
    }
  } else {
    res.status(401).send("Authorization required");
  }
};

devices.update_device = function (req, res, next) {
  if(req.user.permission === 0 && req.user.block === false) {
    var pos = -1;
    var i = 0;
    var id = parseInt(req.params.id);
    var automatic;
    if(req.body.automatic === "true" || req.body.automatic === true) {
      automatic = true;
    } else {
      automatic = false;
    }
    while(pos===-1 && i<req.devices.length) {
      if(req.devices[i].id===id) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      req.devices[pos].automatic = automatic;
      res.status(200).send(req.devices[pos]);
      next();
    } else {
      res.status(404).send("Device not found");
    }
  } else {
    res.status(401).send("Authentication required");
  }
};

devices.devices = function (req, res) {
  debugger;
  if(req.user.block === false) {
    res.status(200).send(req.devices);
  } else {
    res.status(401).send("Authorizetion required");
  }
};

devices.output_devices = function (req, res) {
  debugger;
  var device = {};
  var output_devices = [];
  var j = 0;
  var pos;
  if(req.user.block === false) {
      for(var i = 0; i < req.devices.length; i++) {
        if(req.devices[i].io === "output" && req.devices[i].id_GPIO !== 0) {
          device = {};
          device.name = req.devices[i].nome;
          device.description = req.devices[i].description;
          device.state = req.devices[i].state;
          device.distance = "Sconosciuta";
          device.proximity = "ProximityFar";
          device.automatic = req.devices[i].automatic;
          device.unable = 0;
          device.uuid = 0;
          device.major = 0;
          device.minor = 0;
          j = 0;
          pos = -1;
          while(pos === -1 && j < req.devices.length) {
            if(req.devices[j].id === req.devices[i].id_ibeacon) {
              pos = j;
              device.uuid = req.devices[j].properties.uuid;
              device.major = req.devices[j].properties.major;
              device.minor = req.devices[j].properties.minor;
            }
            j++;
          }
          j = 0;
          pos = -1;
          while(pos === -1 && j < req.devices.length) {
            if(req.gpio[j].id === req.devices[i].id_GPIO) {
              trovato = 1;
              if(req.gpio[j].state === true || req.gpio[j].state === 1) {
                devices.state = true;
              }else {
                devices.state = false;
              }
            }
            j++;
          }
          devices.id_GPIO = req.devices[i].id_GPIO;
          output_devices.push(device);
        }
      }
    res.status(200).send(output_devices);
  }else {
    res.status(401).send("Authorization required");
  }
};

devices.add_device = function (req, res, next) {
  if(req.user.block ===false) {
    var newDevice = {
      id: Date.now(),
      type: req.body.type,
      io: req.body.io,
      name: req.body.name,
      description: req.body.description,
      permission: req.body.permission,
      id_GPIO: 0,
      id_ibeacon: 0,
      properties: req.body.properties
    }
    req.devices.push(newDevice);
    res.status(200).send("Success");
    next();
  } else {
    res.status(401).send("authentication required");
  }
};

devices.delete_device = function (req, res, next) {
  var pos = -1;
  var i = 0;
  var id = parseInt(req.params.id);
  if(req.user.block === false && req.user.permission === 0) {
    while(pos===-1 && i<req.devices.length) {
      if(req.devices[i].id===id) {
        pos = i;
      }
      i++;
    }
    if(pos>=0) {
      req.devices.splice(pos,1);
      res.status(200).send("Success");
      next();
    } else {
      res.status(404).send("Device not found");
    }
  } else {
    res.status(401).send("Authorization required");
  }
};

module.exports = devices;