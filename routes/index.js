//route dependencies
var db           = require('../db');
var routeActions = require('../routeActions')(db);
var user         = require('../schemas/user');

//all routes go below (Inside of module.exports block)
module.exports = function (app) {
  app.get('/users', routeActions.users);
  app.get('/recipes/search', routeActions.searchRecipes);
  app.get('/recipes/:id', routeActions.getRecipe);
  app.post('/recipes', routeActions.saveRecipe);
};
