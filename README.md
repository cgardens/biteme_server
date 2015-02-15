# Bit Me Api

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
http://localhost:9000/recipes/search?term=YOURSEARCHTERM

####Get Recipe By RecipeID (from Big Oven):
type: GET
http://localhost:9000/recipes/:recipeID

sample ID: 175169


###User Routes

####Show All Users
type: GET
http://localhost:9000/users

####Show One User (by ID)
type: GET
http://localhost:9000/users/:id

####Create New User
type: POST
http://localhost:9000/users/create

sample input: {newUser: {"email": "gary@dev.com", "username": "gary", "password": "123", "firstName": "gary", "lastName": "guard"}}

####Edit a User
type: PUT
http://localhost:9000/users/:id

sample input: {editUser: {"email": "gary@dev.com", "username": "gary", "password": "123", "firstName": "gary", "lastName": "guard"}}

####Delete a User
type: DELETE
http://localhost:9000/users/:id

####Add User Recipe
type: PUT
http://localhost:9000/users/:id/recipes/create

####Get Users Recipes
type: GET
http://localhost:9000/users/:id/recipes