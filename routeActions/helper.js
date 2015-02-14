var request = require('request');
var dotenv = require('dotenv');
dotenv.load()

apiHelper = {

  callApi: function(req, res){
    var result = 0,
        apiKey = process.env.BIG_OVEN_API_KEY,
        recipeID = req.params.id
        url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + apiKey
    request.get({url:url, json:true})
            .on('response', function(response) {
              response
                .on('data', function(chunk) {
                 // console.log('BODY: ' + chunk);
                 if (!result) {
                  result = chunk
                } else {
                  result += chunk
                }

                })
                .on('end', function() {
                  apiHelper.sendCompleteRecipe(result, res);
                })
              // console.log(response);
              // console.log(response.statusCode) // 200
              // console.log(response.headers['content-type']) // 'image/png'
            })
  },

  sendCompleteRecipe: function(result, res){
    parsedRecipe = apiHelper.parseRecipe(result);
    res.send(parsedRecipe);
  },

  parseRecipe: function(result){
    var parsedResult,
        recipeID,
        title,
        description,
        cuisine,
        ingredients,
        parsedIngredients,
        instructions,
        currentStep,
        rating,
        imageURL,
        bigOvenLink,
        yieldNumber,
        yieldUnit,
        toSend;

    parsedResult = JSON.parse(result);
    //formatting for export
    title = parsedResult.Title;
    description = parsedResult.Description;
    ingredients = parsedResult.Ingredients;
    parsedIngredients = {}
    ingredients.forEach(function(element){
      parsedIngredients[element.Name] = element.Quantity + " " + element.Unit + " " + element.Name;
    })
    instructions = parsedResult.Instructions;
    instructions = instructions.split('.')
    currentStep = 0;
    imageURL = parsedResult.HeroPhotoUrl
    recipeID = parsedResult.RecipeID
    cuisine = parsedResult.Cuisine
    rating = parsedResult.StarRating
    bigOvenLink = parsedResult.WebURL
    yieldNumber = parsedResult.YieldNumber
    yieldUnit = parsedResult.YieldUnit


    toSend = { recipeID: recipeID,
                title: title,
                description: description,
                cuisine: cuisine,
                ingredients: parsedIngredients,
                instructions: instructions,
                currentStep: currentStep,
                rating: rating,
                imageURL: imageURL,
                bigOvenLink: bigOvenLink,
                servings: { yieldNumber: yieldNumber,
                          yieldUnit: yieldUnit },
                ingredientsVerbose: ingredients
              }

    return toSend;
  }
}

module.exports = apiHelper;