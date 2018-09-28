let {mongoose} = require('../db/mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let RecipeSchema = mongoose.Schema(({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 2,
        max: 20,
        trim: true
    },
    category: {
        type: String,
        required: true,
        min: 2,
        max: 20,
        trim: true
    },
    description: {
        type: String,
        required: true,
        min: 2,
        max: 200,
    },
    persons: {
        type: Number,
        required: true,
        minval: 1
    },
    instructions: {
        type: [String],
        required: true
    },
    ingredients: {
        type: [
            {
                name: String,
                units: Number,
                measuringUnit: String,
                unitEquivalentInGrams: Number
            }
        ],
        required: true
    },
    totalNutritions: {
        vitaminA: Number,
        vitaminB: Number,
        vitaminC: Number,
        vitaminD: Number,
        vitaminE: Number,
        vitaminB12: Number,
        vitaminB6: Number,
        energiKcal: Number,
        kolhydrater: Number,
        protein: Number,
        fett: Number,
        jarn: Number
    },
    imgurl: {
        type: String
    }
}))
RecipeSchema.plugin(uniqueValidator);
let Recipe = mongoose.model('recipes', RecipeSchema);
module.exports = {
    Recipe
}