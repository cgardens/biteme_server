
//initialize app
var express   = require('express');
var path      = require('path');
var morgan    = require("morgan");
var mongoose  = require("mongoose");
var app       = express();
var routes    = require('./routes')(app);

// all environments
var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log('Node express server running on port ' + port);

//CORS Configuration
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

  next();
});




