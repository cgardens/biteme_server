var User = require('../schemas/user');
var apiHelper = require('../routeActions/api-helpers.js');
var bodyParser = require('body-parser')

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

// {email: 'gar@dev.com',
//                           username: "gary",
//                           password: "123",
//                           firstName: "gary",
//                           lastName: "guard",
//                           recipes: [],
//                           customRecipes: []
//     }


  functions.createUser = function(req, res) {
    // console.log(req)
    // req.param.userName = {email: 'charles@dev.com',
                          // username: "docgardens",
                          // password: "123",
                          // firstName: "charles",
                          // lastName: "gardens",
                          // recipes: [],
                          // customRecipes: [] }

    var newUser = req.param('newUser');
    console.log(req.param)
    console.log(req.body)
    console.log(newUser)
    var record = new User(newUser);

    record.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({status: err});
      } else {
        res.json({status: 'success'})
      }

    })
  };

  functions.searchRecipes = function(req, res) {
    apiHelper.searchRecipesFromBigOven(req, res);
  };

  functions.getRecipe = function (req, res) {
    apiHelper.getRecipeFromBigOven(req, res);
  };

  return functions;
};
