let { mongoose } = require('./db/mongoose')
let { Recipe } = require('./models/recipe')
let { Ingredient } = require('./models/ingredient')

let addRecipe = (recipeObj) => {
    return new Promise((resolve, reject) => {
        CalulateNutritionsFromRecipe(recipeObj);
        let recipe = new Recipe(recipeObj);
        recipe.save().then(doc => {
            resolve(doc);
        }, (error) => {
            reject(error.message)
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
        Ingredient.find({ Namn: { $regex: "/*" + name + ".*" } }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err)
        })
    })
}



function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function nutritionsFromIngredientPer100Gram(ingredient) {
    //   calculateNutritionsFromIngredient(result[0].Naringsvarden.Naringsvarde)

    ingredient.map(item => {
        switch (item.Namn) {
            case 'Protein':
                ingredientNutritions.Protein = item.Varde;
                break;
            case 'Kolhydrater':
                ingredientNutritions.Kolhydrater = item.Varde;
                break;
            case 'Fett':
                ingredientNutritions.Fett = item.Varde;
                break;
            case 'Energi (kcal)':
                ingredientNutritions.EnergiKcal = item.Varde;
                break;
            default:
        }

    })
    return ingredientNutritions;
}
////////////LOOP THROUGHT OBJECTS AND TRY TO ATT TOTAL NUTRITION!
function CalulateNutritionsFromRecipe(recipe) {
    return new Promise((resolve, reject) => {

        let totalNutritions = {
            "Vitamin A": 0,
            "Vitamin B": 0,
            "Vitamin C": 0,
            "Vitamin D": 0,
            "Vitamin E": 0,
            "Vitamin B12": 0,
            "Vitamin B6": 0,
            energiKcal: 0,
            "Kolhydrater": 0,
            "Proteiner": 0,
            "Fett": 0,
            "Järn": 0
        }
        recipe.ingredients.forEach(item => {
            let ingredientTotalGram = (item.units * item.unitEquivalentInGrams);
            
            Ingredient.find({ Namn: item.name }).then((result) => {
                result[0].Naringsvarden.Naringsvarde.map(item => {
                    if (item.Namn in totalNutritions) {
                        totalNutritions[item.Namn] += ingredientTotalGram;
                    }
                })
            }).catch(() => {

            })


        });
        console.log(totalNutritions)


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

module.exports = {
    addRecipe,
    getRecipes,
    getRecipesByCategory,
    getIngredientByName,
    getIngredientsByAutoComplete,
    getRecipeByName
}



