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
  app.post('/admin/users/create', jsonParser, routeActions.createUser);
  app.put('/admin/users/:id', jsonParser, routeActions.updateUser);
  app.delete('/admin/users/:id', routeActions.deleteUser);


  app.get('/recipes/search', routeActions.searchRecipes);
  app.get('/users/:id/customrecipe/:customRecipeId', routeActions.getCustomRecipe)
  app.get('/recipes/:id', routeActions.getRecipe);

  app.get('/admin/users/:id/recipes', routeActions.getUserRecipes)
  app.post('/admin/users/:id/recipes', jsonParser, routeActions.addUserRecipe)

  //doesn't require auth
  app.get('/users/search', routeActions.searchUsers)

//auth
  app.post('/users/signup', jsonParser, routeActions.signup);

  app.get('/facebook_signup', routeActions.facebookSignup);
  app.get('/fb_authenticate', routeActions.facebookAuthenticate);
  app.get('/fb_get_token', routeActions.facebookGetToken);
  // app.get('/fb_request', routeActions.facebookRequest);




  app.post('/authenticate', jsonParser, routeActions.authenticate);
  app.get('/users/:id', routeActions.ensureAuthorized, routeActions.userProfile)
  app.post('/users/:id/recipes/custom', routeActions.ensureAuthorized, jsonParser, routeActions.addCustomUserRecipeAuthenticated)
  app.post('/users/:id/recipes', routeActions.ensureAuthorized, jsonParser, routeActions.addUserRecipeAuthenticated)
  //doesn't require auth
  app.get('/users/:id/recipes', routeActions.getUserRecipes)
  //other restful user routes with auth
  app.put('/users/:id', routeActions.ensureAuthorized, jsonParser, routeActions.updateUserAuthenticated);
  app.delete('/users/:id', routeActions.ensureAuthorized, routeActions.deleteUserAuthenticated);
  app.get('/users', routeActions.usersPublic)
};
