###Admin User Routes

####Show All Users
type: GET
http://localhost:3000/admin/users

####Show One User (by ID)
type: GET
http://localhost:3000/admin/users/:id

####Create New User
type: POST
http://localhost:3000/admin/users/create

sample input: {newUser: {"email": "gary@dev.com", "username": "gary", "password": "123", "firstName": "gary", "lastName": "guard"}}

####Edit a User
type: PUT
http://localhost:3000/admin/users/:id

sample input: {editUser: {"email": "gary@dev.com", "username": "gary", "password": "123", "firstName": "gary", "lastName": "guard"}}

####Delete a User
type: DELETE
http://localhost:3000/admin/users/:id

####Add User Recipe
type: POST
http://localhost:3000/admin/users/:id/recipes/

  requires the following data

  recipeToAdd: VALID_BIG_OVEN_RECIPE_ID

####Get User's Recipes
type: GET
http://localhost:3000/admin/users/:id/recipes