# Bite Me Api

##Try It Out
Bite Me is live at [http://bite-me.herokuapp.com](http://bite-me.herokuapp.com)

##Summary
A voice-controlled recipe app that makes cooking from a recipe a hands-free experiences.

We developed the project in the MEAN stack on decoupled architecture which allowed us to develop both a web app and a mobile app concurrently. Checkout the [Bite Me Angular Client](https://github.com/cgardens/biteme_client) and the [Bite Me Ionic Client](https://github.com/cgardens/biteme_ionic_client) to see the accompanying Angular and mobile front ends.

This was a one-week project at DBC.



Dependencies

- NodeJS: [http://nodejs.org/](http://nodejs.org/)
- ExpressJS: [http://expressjs.com/starter/installing.html](http://expressjs.com/starter/installing.html)
- Optional: MongoLab
- Mongoose: [http://mongoosejs.com/docs/index.html](http://mongoosejs.com/docs/index.html)
- DotENV: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
- Request: [https://www.npmjs.com/package/request](https://www.npmjs.com/package/request)

##Setup Instructions
```
$ npm install
```

run the server:
```
$ npm start
```

##Routes

###Recipe Routes

####Search Recipes (from Big Oven):
type: GET
http://localhost:3000/recipes/search?term=YOURSEARCHTERM

####Get Recipe By RecipeID (from Big Oven):
type: GET
http://localhost:3000/recipes/:recipeID

sample ID: 175169


###User Auth Routes

####Sign Up
type: POST
http:localhost:3000/users/signup

  this request needs the following key-value pairs:

  email: user@email.com

  username: username

  password: password

  firstName: firstname

  lastName: lastname

  this request will return a json object with the following information:

```
{
  "type": true,
  "data": {
      "__v": 0,
      "password": "123",
      "email": "ralph@test.com",
      "_id": "54e17397a05f37ef0a82c44d",
      "customRecipes": [],
      "recipes": []
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInBhc3N3b3JkIjoiMTIzIiwiZW1haWwiOiJyYWxwaEB0ZXN0LmNvbSIsIl9pZCI6IjU0ZTE3Mzk3YTA1ZjM3ZWYwYTgyYzQ0ZCIsImN1c3RvbVJlY2lwZXMiOltdLCJyZWNpcGVzIjpbXX0.oMDZxitchaGOcGZz4qUMFHpC6Y7yyjV5kSGG1ycabTs"
}
```

  you need to save the token in order to make requests to the biteme api for protected info.

  you should also at least hang onto the _id, as that is the value needed to request user-specific information.

####Authenticate a User (i.e. Login)
type: POST
http:localhost/authenticate

This route requires a valid email and password
username: user@dbc.com

password: 123

####Check Authorization
The following is needed as header when trying access user-specific information.

```
authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInBhc3N3b3JkIjoiMTIzIiwiZW1haWwiOiJyYWxwaEB0ZXN0LmNvbSIsIl9pZCI6IjU0ZTE3Mzk3YTA1ZjM3ZWYwYTgyYzQ0ZCIsImN1c3RvbVJlY2lwZXMiOltdLCJyZWNpcGVzIjpbXX0.oMDZxitchaGOcGZz4qUMFHpC6Y7yyjV5kSGG1ycabTs
```

routes that require this header include:

GET localhost:3000/users/:id
POST localhost:3000/users/:id/recipes

####User Profile
type: GET
localhost:3000/users/:id

####User Adds Recipe
type: POST
localhost:3000/users/:id/recipes

  requires the following data

  recipeToAdd: VALID_BIG_OVEN_RECIPE_ID

####Get User's Recipes
type: GET
http://localhost:3000/admin/users/:id/recipes

####User Edit
type: PUT
http://localhost:3000/users/:id

sample input: {editUser: {"email": "gary@dev.com", "username": "gary", "password": "123", "firstName": "gary", "lastName": "guard"}}

NOTE THAT YOU MUST USE DOUBLE QUOTES HERE OR IT WON'T WORK.

####User Delete
type: DELETE
http://localhost:3000/users/:id

####View All Enrolled Users
type: GET
http://localhost:3000/users

####Search For a User
type: GET
http://localhost:3000/users/search?username=USERNAME

###Custom Recipe Routes

####Add Custom Recipe
type: POST
http://localhost:3000/users/:id/recipes/custom

pass in the following info:
```
{customRecipeId: 1,
servings: {
  yieldUnit: "desert rabbits",
  yieldNumber: "25"
},
imageURL: "https://lh4.googleusercontent.com/-OW6DktCVsrs/AAAAAAAAAAI/AAAAAAAAAAA/GYit4qKfKGs/s128-c-k/photo.jpg",
instructions: [
  "sherif all over keyboard",
  "brain explodes"
],
ingredientsVerbose: [
  {
    PreparationNotes: "",
    Unit: "and only",
    Quantity: "the one",
    Name: "sherif",
    id: "1"
  },
  {
    PreparationNotes: "",
    Unit: "units",
    Quantity: "10",
    Name: "computers",
    id: 2
  }
],
cuisine: "american",
description: "bootcamp",
title: "DBC"
```

####Show Custom Recipe Page
type: GET
http://localhost:3000/users/:id/customrecipe/:customRecipeId
showpage for custom recipe





