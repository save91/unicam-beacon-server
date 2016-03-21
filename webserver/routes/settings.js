//Object setting
var settings = {};
var exec = require('child_process').exec;
var environment = process.env.NODE_ENV
if(environment === "development") {
  var gpio = require('../routes/gpio-fake');
} else {
  var gpio = require('../routes/gpio');
}

settings.hello = function (req, res) {
  var response = {
    port: "8000",
    name: req.settings.name,
    version: req.settings.version
  };
  res.status(200).send(response);
};

settings.halt = function (req, res) {
  gpio.unexportPins();
  exec("halt", function (error, stdout, stderr) {
    console.log('exec: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      res.status(403).send("permesso negato");
    } else {
      res.status(200).send("halt");
    }
  });
};

settings.reboot = function (req, res) {
  gpio.unexportPins();
  exec("reboot", function (error, stdout, stderr) {
    console.log('exec: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      res.status(403).send("permesso negato");
    } else {
      res.status(200).send("reboot");
    }
  });
};

settings.exit = function (req, res) {
  res.status(200).send("exit");
  gpio.unexportPins();
};

settings.update = function (req, res) {
  res.status(200).send("update");
};

module.exports = settings;
