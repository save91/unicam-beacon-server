var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());

var SERVERPORT = 8000;

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
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


app.listen(SERVERPORT);
console.log('Server listening on port ' + SERVERPORT);
