var User = require('../schemas/user');
var apiHelper = require('../routeActions/helper.js');

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

  functions.getRecipe = function (req, res) {
    apiHelper.callApi(req, res);
  };

  return functions;
};
