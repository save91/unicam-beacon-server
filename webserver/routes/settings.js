//Object setting
var settings = {};

settings.hello = function (req, res) {
  var response = {
    name: req.settings.name,
    varsion: req.settings.version
  };
  res.status(200).send(response);
}

module.exports = settings;
