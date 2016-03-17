//Object setting
var settings = {};
var environment = process.env.NODE_ENV
if(environment === "development") {
  var gpio = require('../routes/gpio-fake');
  console.log("PC...booting");
} else {
  var gpio = require('../routes/gpio');
  console.log("Raspberry...booting");
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
  res.status(200).send("halt");
};

settings.reboot = function (req, res) {
  res.status(200).send("reboot");
};

settings.exit = function (req, res) {
  res.status(200).send("exit");
  gpio.unexportPins();
};

settings.update = function (req, res) {
  res.status(200).send("update");
};

module.exports = settings;
