var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./app/routes/user');
var db = require('./config/db');
var security = require('./config/security')

var datamanager = require('./models/datamanager');

var environment = process.env.NODE_ENV;
console.log("Environment: ", environment);

var app = express();
var morgan = require('morgan');
//app.use(morgan);
var port = 8000;
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

routes.addAPIUser(app, mongoose);

app.use(function(req, res, next){
  res.status(404);
  res.json({ error: 'Invalid URL' });
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

//catches ctrl+c event
process.on('SIGINT', function(){
  console.log("Stop webserver");
  process.exit();
});

app.listen(port);
console.log('GPIO setup completed and server listening on port ' + port);

exports = module.exports = app;