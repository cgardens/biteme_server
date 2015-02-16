// initialize ENV VARS
var dotenv    = require('dotenv');
dotenv.load();

//initialize app
var express     = require('express');
var path        = require('path');
var morgan      = require("morgan");
var bodyParser  = require('body-parser');
var mongoose    = require("mongoose");
var app         = express();

// all environments
var port = process.env.PORT || 9000;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log('Node express server running on port ' + port);

// Routes need to be setup after configuring Express environment
var routes = require('./routes')(app);

//CORS Configuration
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

  next();
});




