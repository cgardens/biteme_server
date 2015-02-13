var User = require('../schemas/user');
var http = require('http');
var bodyParser = require('body-parser')
var dotenv = require('dotenv');
dotenv.load()

module.exports = function () {

  var functions = {};

  functions.users = function (req, res) {
    User.find()
      .exec(function(err, users) {
      if (err) {
        res.status(500).json({status: 'failure'});
      } else {
        res.json(users);
      }
    });
  };

  functions.searchRecipes = function (req, res) {

    var apiKey = process.env.BIG_OVEN_API_KEY

    var options = {headers: {'dataType': 'json'}}

    var url = "http://api.bigoven.com/recipe/196149?api_key=" + apiKey
    console.log(url);
    http.get(url, function(res) {
      console.log("Got response: " + res.statusCode);
      res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
      })
      // console.log(res);
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

    res.json({ status: "complete"});
  };

  return functions;
};
