let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Recipe-app');


let Ingredient = mongoose.model('ingredients', {
    Nummer: {
        type: String
    },
    Namn: {
        type: String
    },
    ViktGram: {
        type: String
    },
    Huvudgrupp: {
        type: String
    },
    Naringsvarden: {
            Naringsvarde: [
                {
                   Namn: String,
                    Forkortning: String,
                    Varde: String,
                    Enhet: String,
                    SenastAndrad: Date
                }
            ]
    }
    
    });

let Recipe = mongoose.model('recipe', {
    name: {
        type: String
    },
    persons: {
        type: Number
    },
    instructions: {
        type: [String]
    },
    ingredients: {
        type: [Ingredient]
    },
    imgurl: {
        type: String
    }
});


