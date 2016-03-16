//Object setting
var settings = {};

settings.hello = function (req, res) {
  var response = {
    port: "8000",
    name: req.settings.name,
    version: req.settings.version
  };
  res.status(200).send(response);
}

module.exports = settings;
