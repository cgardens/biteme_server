# Bit Me Api

Made for dbc phase 3.

 Dependencies

 - NodeJS: [http://nodejs.org/](http://nodejs.org/)
 - ExpressJS: [http://expressjs.com/starter/installing.html](http://expressjs.com/starter/installing.html)
 - Optional: MongoLab
 - Mongoose: [http://mongoosejs.com/docs/index.html](http://mongoosejs.com/docs/index.html)
 - DotENV: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
 - Request: [https://www.npmjs.com/package/request](https://www.npmjs.com/package/request)

 ###Setup Instructions
 ```
 $ npm install
 ```

 run the server:
 ```
 $ npm start
 ```

 ###Routes

 ####Search Recipes (from Big Oven):
 http://localhost:9000/recipes/search?term=YOURSEARCHTERM

 ####Get Recipe By RecipeID (from Big Oven):
 http://localhost:9000/recipes/:recipeID

  sample ID: 175169
