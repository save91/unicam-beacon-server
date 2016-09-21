var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRoutes = require('./app/routes/user');
var deviceRoutes = require('./app/routes/device');
var beaconRoutes = require('./app/routes/beacon');
var settingRoutes = require('./app/routes/setting');
var gpioRoutes = require('./app/routes/gpio');

var gpios = require('./app/services/gpio');

var db = require('./config/db');
var security = require('./config/security')

var http = require('http').Server(app);
var io = require('socket.io')(http);

var environment = process.env.NODE_ENV;
console.log("Environment: ", environment);

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

var port = 8000;

var GPIO = require('./app/models/gpio');
var pin = require('./app/services/gpio');

mongoose.connect(db.url);

app.use(express.static(__dirname + '/angular'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// middleware authentication & log
app.use([userRoutes.authentication, morgan('common', {stream: accessLogStream})]);

userRoutes.addAPIRouter(app);
deviceRoutes.addAPIRouter(app, environment);
beaconRoutes.addAPIRouter(app);
settingRoutes.addAPIRouter(app);
gpioRoutes.addAPIRoutes(app, environment);

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
  gpios.unexportPins(environment);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('get:gpio', function(){
    GPIO.find(function(err, GPIOs) {
      if(err) {
        console.log('Errore');
        socket.emit('error', {msg: err.errmsg});
      } else if(GPIOs) {
        console.log('Successo');
        socket.emit('get:gpio', GPIOs);
      }
    });
  });

  socket.on('put:gpio', function(data){
    GPIO.findOne({
      '_id': data.id,
      'type':'output'
    }, function(err, gpio) {
      if(err) {
        socket.emit('error',{msg: err.errmsg});
      } else if(gpio) {
        if(undefined != data.value) {
          gpio.value = data.value;
        }
        gpio.save(function (err) {
          if(err) {
            socket.emit('error',{msg: err.errmsg});
          } else {
            pin.setPin(gpio.GPIO, gpio.value, function(err) {
              if (err) {
                socket.emit('error', {msg: err.errmsg});
              } else {
                socket.broadcast.emit('put:gpio', gpio);
              }
            }, environment);
          }
        });
      } else {
        socket.emit('error', {msg: err.errmsg});
      }
    });
  });
});



gpios.init(environment);
http.listen(port ,function() {
  console.log('GPIO setup completed and server listening on port ' + port);
});

exports = module.exports = app;
