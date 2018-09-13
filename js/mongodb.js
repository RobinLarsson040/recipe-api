const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017/Recipe-app', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const database = client.db('Recipe-app')
    db = database;
})

let getIngredientsByAutoComplete = (input) => {
    return new Promise((resolve, reject) => {
        let name = capitalize(input);
        db.collection('ingredients').find({ Namn: { $regex: "/*" + name + ".*" } }).toArray().then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err)
        })
    })
}

let getIngredientByName = (input) => {
    return new Promise((resolve, reject) => {
        let name = capitalize(input);
        db.collection('ingredients').findOne({ Namn: name }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err)
        })
    })
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

module.exports = {
    getIngredientsByAutoComplete,
    getIngredientByName
}
