# Test post routes.
Use below curl command to post to recipe db.
```
curl --globoff --data "recipe[title]=Q's mac&recipe[description]=mac cheese"  http://localhost:9000/recipes
```

--globoff is added to escape square brackets [].

# Mongo terminal commands

Run mongo on command line
```
mongod
```

```
show dbs
```

Shows all databases
```
use db_name
```
Switch to that database

```
show collections
```

Shows collections in that particular database.

```
db.collection_name
```

### Useful terminal command
```
db.collection_name.count()
db.collection_name.find()[0]
db.collection_name.findOne({key: value})
db.collection_name.find({"title": "testing create recipes route"}, "title":$)
```

###Projections
Limits the data returned. The below returns just the title.
```
db.recipes.find({"title": "testing create recipes route"}, {title: 1})
```
