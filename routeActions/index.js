var User = require('../schemas/user');
var apiHelper = require('../routeActions/api-helpers.js');
var bodyParser = require('body-parser')
var jwt = require("jsonwebtoken");

module.exports = function () {

  var functions = {};

// admin user functions

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

    record.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({status: err});
      } else {
        res.json({status: 'success', user: user})
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
                User.findOne({_id: id}, function(err, user) {
                      if (err) {
                          res.json({
                              type: false,
                              data: "Error occured: " + err
                          });
                      } else {
                          res.json({
                              type: true,
                              status: 'success',
                              data: user
                          });
                      }
                });
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
          res.json({status: 'success', added: recipeToAdd})
        }
      })
    })
  };

  //auth

  functions.ensureAuthorized = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log('authorization', req.headers["authorization"])
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        console.log('bearer', bearer)
        bearerToken = bearer[0];
        // bearerToken = bearer[1];
        console.log('bearer token', bearerToken)
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
        res.status(403).end();
    }
  };

  functions.signup = function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
              var userModel = new User();
              userModel.email = req.body.email;
              userModel.firstName = req.body.firstName;
              userModel.lastName = req.body.lastName;
              userModel.password = req.body.password;
              userModel.token = jwt.sign(userModel, 'shhhhh')
              // console.log(userModel)
              userModel.save(function(err, user) {
                res.json({
                  type: true,
                  data: user,
                  token: user.token
                });
              });
            }
        }
    });
  };

  functions.authenticate = function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        // console.log(user)
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
  };

  functions.me = function(req, res) {
    console.log("me", req.token);
    User.findOne({token: req.token}, function(err, user) {
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
  };

  functions.userProfile = function (req, res) {
    console.log('user', req.token)
    console.log('user request', req)
    var id = req.param('id');
    User.findOne({_id: id, token: req.token}, function(err, user) {
      console.log(user)
      user.token = 'redacted';
      user.password = 'redacted';
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


  return functions;
};
