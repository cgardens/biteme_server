var User = require('../schemas/user');
var http = require('http');
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

    console.log('in search recipes');
    // var querystring='hi'
    // var postData = querystring.stringify({
    //   'msg' : 'Hello World!'
    // });
    var postData = 'hi'


    var apiKey = process.env.BIG_OVEN_API_KEY
    console.log(apiKey);
    // var url = "http://api.bigoven.com/recipe/" + 196149 + "?api_key=" + apiKey
    // console.log(url);
    var recipeID = 196149;

    var path = "/recipe/" + recipeID + "?api_key="+ apiKey

    var options = {
      hostname: "http://api.bigoven.com/",
      port: 80,
      path: path,
      method: 'GET',
      headers: {
        dataType: 'json',
        cache: false,
      }
    }

    var req = http.request(options, function(res) {
      console.log('STATUS' + res.statusCode);
      console.log('HEADERS' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        console.log('BODY' + chunk);
      });
    });

    console.log(req)

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    })

    req.write(postData);
    req.end();
  };

  return functions;
};
