var User = require('../schemas/user');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
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
    var myCallback = function(){
      console.log('im done');
      console.log(result);

      res.send(result);
    }

    var result = 0
    var apiKey = process.env.BIG_OVEN_API_KEY
    var url = "http://api.bigoven.com/recipe/196149?api_key=" + apiKey

    request.get({url:url, json:true})
            .on('response', function(response) {
              response.on('data', function(chunk) {
               console.log('BODY: ' + chunk);
               console.log("here in on");
               if (!result) {
                result = chunk
              } else {
                result += chunk
              }
               // console.log(result);

              })
            .on('end', function() {
              myCallback();
            })
              // console.log("here in request");
              // console.log(response);
              // console.log(response.statusCode) // 200
              // console.log(response.headers['content-type']) // 'image/png'
    })
    console.log("here in searchRecipes");
  };

  return functions;
};
