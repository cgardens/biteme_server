//route dependencies
var db           = require('../db');
var routeActions = require('../routeActions')(db);
var user         = require('../schemas/user');

//all routes go below (Inside of module.exports block)
module.exports = function (app) {
  app.get('/users', routeActions.users);
};
