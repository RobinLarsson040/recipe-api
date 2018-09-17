let {mongoose} = require('../db/mongoose')
let IngredientSchema = mongoose.Schema(({
    Namn: {
        type: String
    },
    cateHuvudgrupp: {
        type: String
    },
    Naringsvarden: {
        Naringsvarde: [
            {
                Namn: String,
                Forkortning: String,
                Varde: String,
                Enhet: String,
            }
        ]
    }
}))

let Ingredient = mongoose.model('ingredients', IngredientSchema);

module.exports = {
    Ingredient
}
