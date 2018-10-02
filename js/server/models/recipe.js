let { mongoose } = require('../db/mongoose')
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
        type: [
            {
                value: String
            }
        ],
        required: true,
    },
    tags: {
        type: [
            {
                value: String
            }
        ],
        required: true,
    },
    ingredients: {
        type: [
            {
                name: String,
                units: Number,
                measuringUnit: String,
                unitEquivalentInGrams: Number,
                per100g: {
                    "Energi (kcal)": String,
                    "Fett": String,
                    "Kolhydrater": String,
                    "Protein": String,
                    "Salt": String,
                    "Socker totalt": String,
                    "Summa mättade fettsyror": String,
                    "Summa enkelomättade fettsyror": String,
                    "Summa fleromättade fettsyror": String
                }
            }
        ],
        required: true
    },
    imageUrl: {
        type: String
    }
}))
RecipeSchema.plugin(uniqueValidator);
let Recipe = mongoose.model('recipes', RecipeSchema);
module.exports = {
    Recipe
}