var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  bigOvenID: String,
  title: String,
  description: String,
  cuisine: String,
  ingredients: String,
  instructions: String,
  rating: String,
  imageURL: String,
  bigOvenLink: String,
  servings: String
});


module.exports = mongoose.model('Recipe', recipeSchema);
