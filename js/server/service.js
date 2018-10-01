let { mongoose } = require('./db/mongoose')
let { Recipe } = require('./models/recipe')
let { Ingredient } = require('./models/ingredient')
let { User } = require('./models/user')

let addRecipe = (recipeObj) => {
    return new Promise((resolve, reject) => {
        let recipe = new Recipe(recipeObj);
        recipe.save().then(doc => {
            resolve("success");
        }, (error) => {
            console.log(error)
            reject(error)
        })
    })
}

let getRecipes = () => {
    return new Promise((resolve, reject) => {
        Recipe.find().then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}

let getRecipeByName = (input) => {
    let name = capitalize(input);
    return new Promise((resolve, reject) => {
        Recipe.find({ name: name }).then((result) => {
            result[0].ingredients
            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}

let getRecipesByCategory = (category) => {
    return new Promise((resolve, reject) => {
        Recipe.find({ category: category }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}

let getIngredientsByAutoComplete = (input) => {
    return new Promise((resolve, reject) => {
        let name = capitalize(input);
        Ingredient.find({ Namn: new RegExp('^' + name, 'i') }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}

let login = (user) =>{
    return new Promise((resolve, reject) => {
        User.find({ username: user.username, password: user.password }).then((result) => {
           if(result.length > 0){
               resolve("success")
           }else{
               reject("error")
           }
        }).catch((err) => {
            reject('error')
        })
    })
}

let getIngredientByName = (input) => {
    return new Promise((resolve, reject) => {
        let name = capitalize(input);
        Ingredient.find({ Namn: name }).then((result) => {

            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

module.exports = {
    addRecipe,
    getRecipes,
    getRecipesByCategory,
    getIngredientByName,
    getIngredientsByAutoComplete,
    getRecipeByName,
    login
}



