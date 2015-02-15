//route dependencies
var db           = require('../db');
var routeActions = require('../routeActions')(db);
var user         = require('../schemas/user');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//all routes go below (Inside of module.exports block)
module.exports = function (app) {
  app.get('/users', routeActions.users);
  app.get('/users/:id', routeActions.user)
  app.post('/users/create', urlencodedParser, jsonParser, routeActions.createUser);
  app.put('/users/:id', urlencodedParser, routeActions.updateUser);
  app.delete('/users/:id', routeActions.deleteUser);


  app.get('/recipes/search', routeActions.searchRecipes);
  app.get('/recipes/:id', routeActions.getRecipe);

  app.get('/users/:id/recipes', routeActions.getUserRecipes)
  app.post('/users/:id/recipes', urlencodedParser, routeActions.addUserRecipe)

};
