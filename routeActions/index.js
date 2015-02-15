var User = require('../schemas/user');
var apiHelper = require('../routeActions/api-helpers.js');
var bodyParser = require('body-parser')

module.exports = function () {

  var functions = {};

// user functions

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

  functions.user = function (req, res) {
    var id = req.param('id');
    User.findOne({_id: id}, function(err, user) {
      if (err) {
          res.json({
              type: false,
              data: "Error occured: " + err
          });
      } else {
          res.json({
              type: true,
              data: user
          });
      }
    });
  }

  functions.createUser = function(req, res) {
    parsedUser = JSON.parse(req.body.newUser);
    // req.param.userName = {email: 'charles@dev.com',
                          // username: "docgardens",
                          // password: "123",
                          // firstName: "charles",
                          // lastName: "gardens",
                          // recipes: [],
                          // customRecipes: [] }

    var record = new User(parsedUser);

    record.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({status: err});
      } else {
        res.json({status: 'success'})
      }

    })
  };

  functions.deleteUser = function (req, res) {
    var id = req.param('id');

    User.remove({_id: id}, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.json({status: 'success'})
      }
    });
  };

  functions.updateUser = function (req, res) {
    var id = req.param('id');
    parsedUserEdits = JSON.parse(req.body.editUser);

    User.update({ _id: id },
      { $set: parsedUserEdits},
      function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({status: 'failure'});
        } else {
          res.json({status: 'success'});
        }
      }
    );
  }

// recipe functions

  functions.searchRecipes = function(req, res) {
    apiHelper.searchRecipesFromBigOven(req, res);
  };

  functions.getRecipe = function (req, res) {
    apiHelper.getRecipeFromBigOven(req, res, apiHelper.sendCompleteRecipe);
  };


  functions.getUserRecipes = function (req, res) {
    var id = req.param('id'),
        self = this

    this.userRecipes = []
    this.counter = 0
    this.listLength = 0

    User.findOne({_id: id}, function(err, user) {
      if (err) {
          res.json({
              type: false,
              data: "Error occured: " + err
          });
      } else {
        if (user.recipes.length === 0 ) {
          res.json({msg: "You don't have any saved recipes."})
        } else {
          this.counter = 1,
          this.listLength = user.recipes.length
          user.recipes.forEach(function(element){
            req.params.id = element
            apiHelper.getRecipeFromBigOven(req, res, apiHelper.packageUserRecipes.bind(self))
          })

        }
      }
    }.bind(self))
  };

  functions.addUserRecipe = function (req, res) {
    var id = req.param('id'),
        recipeToAdd = req.body.recipeToAdd,
        updatedRecipesList;

    User.findOne({_id: id}, function(err, user) {
      if(!user.recipes) {
        user.recipes = []
      }

      user.recipes.push(recipeToAdd)
      updatedRecipesList = user.recipes

      user.save(function(err) {
        if (err) {
          console.log(err);
          res.status(500).json({status: err});
        } else {
          res.json({status: 'success'})
        }
      })
    })
  };

  return functions;
};
