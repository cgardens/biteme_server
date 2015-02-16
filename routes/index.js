//route dependencies
var db           = require('../db');
var routeActions = require('../routeActions')(db);
var user         = require('../schemas/user');
var bodyParser = require('body-parser')

var jwt = require("jsonwebtoken");
var session = require('express-session');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//all routes go below (Inside of module.exports block)
module.exports = function (app) {
  app.get('/admin/users', routeActions.users);
  app.get('/admin/users/:id', routeActions.user)
  app.post('/admin/users/create', urlencodedParser, jsonParser, routeActions.createUser);
  app.put('/admin/users/:id', urlencodedParser, routeActions.updateUser);
  app.delete('/admin/users/:id', routeActions.deleteUser);


  app.get('/recipes/search', routeActions.searchRecipes);
  app.get('/recipes/:id', routeActions.getRecipe);

  app.get('/admin/users/:id/recipes', routeActions.getUserRecipes)
  app.post('/admin/users/:id/recipes', urlencodedParser, routeActions.addUserRecipe)

//auth
  app.post('/users/signup', urlencodedParser, routeActions.signup);
  app.post('/authenticate', urlencodedParser, routeActions.authenticate);
  app.get('/users/:id', routeActions.ensureAuthorized, routeActions.userProfile)
  app.post('/users/:id/recipes', routeActions.ensureAuthorized, urlencodedParser, routeActions.addUserRecipeAuthenticated)
  //doesn't require auth
  app.get('/users/:id/recipes', routeActions.getUserRecipes)
  //other restful user routes with auth
  app.put('/users/:id', routeActions.ensureAuthorized, urlencodedParser, routeActions.updateUserAuthenticated);
  app.delete('/users/:id', routeActions.ensureAuthorized, routeActions.deleteUserAuthenticated);

};
