var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  recipes: Array,
  customRecipes: Array
});

module.exports = mongoose.model('User', userSchema);
