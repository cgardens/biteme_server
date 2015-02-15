var request = require('request');
var dotenv = require('dotenv');
dotenv.load()

apiHelper = {



  searchRecipesFromBigOven: function(req, res) {
    var result = 0,
        apiKey = process.env.BIG_OVEN_API_KEY,
        titleKeyword = req.query.term,
        url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
                  + titleKeyword
                  + "&api_key="+apiKey;

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
                  apiHelper.sendRecipesList(result, res);
                })
              // console.log(response);
              // console.log(response.statusCode) // 200
              // console.log(response.headers['content-type']) // 'image/png'
            })
  },

  sendRecipesList: function(result, res) {
    parsedRecipeList = apiHelper.parseRecipeList(result);
    res.send(parsedRecipeList);
  },

  parseRecipeList: function(result) {
    parsedResult = JSON.parse(result);
    var toSend = { resultCount: parsedResult.ResultCount, results: [] }
    parsedResult.Results.forEach(function(recipe){
      toSend.results.push({recipeID: recipe.RecipeID,
                          title: recipe.Title,
                          cuisine: recipe.Cuisine,
                          rating: recipe.StarRating,
                          bigOvenURL: recipe.WebURL,
                          imageURL: recipe.ImageURL,
                          reviewCount: recipe.ReviewCount,
                          totalTries: recipe.TotalTries,
                          dateAdded: recipe.CreationDate
                          })
    })
    return toSend
  },

  //##############################################################################################

  getRecipeFromBigOven: function(req, res, callback){
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
                  callback(result, res);
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
  },

  packageUserRecipes: function(result, res) {
    // console.log('this.counter')
    // console.log(this.counter)
    // console.log('this.listLength')
    // console.log(this.listLength)
    parsedRecipe = result
    this.userRecipes.push(parsedRecipe);
    if(this.counter === this.listLength) {
      apiHelper.sendUserRecipes(res, this.userRecipes);
    }
    this.counter ++
  },

  sendUserRecipes: function(res, toSend) {
    toSend = apiHelper.parseIndividualRecipesToListFormat(toSend)
    res.json(toSend)
  },

  parseIndividualRecipesToListFormat: function(arrayOfFullRecipes){
    var toSend = {},
    extractedRecipeCount = arrayOfFullRecipes.length,
    recipes = [];
    toSend.recipeCount = extractedRecipeCount;
    arrayOfFullRecipes.forEach(function(recipe){
      recipe = JSON.parse(recipe);
      recipes.push({recipeID: recipe.RecipeID,
                    title: recipe.Title,
                    cuisine: recipe.Cuisine,
                    rating: recipe.StarRating,
                    bigOvenURL: recipe.WebURL,
                    imageURL: recipe.ImageURL,
                    reviewCount: recipe.ReviewCount,
                    totalTries: null, //recipe show pages do not have totalTries
                    dateAdded: recipe.CreationDate})
    })
    toSend.recipes = recipes
    return toSend
  }

}

module.exports = apiHelper;