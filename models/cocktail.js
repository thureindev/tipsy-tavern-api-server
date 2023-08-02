const mongoose = require('mongoose');
const { ingredientSchema } = require('./ingredient')


const cocktailSchema = new mongoose.Schema({
    '_id': {
        'type': Number,
        'required': [true, 'Cannot add object without ID']
    },

    'name': {
        'type': String,
        'required': [true, 'Cannot add cocktail without name']
    },
    'cat': String,
    'alcohol': String,
    'glass': String,

    'ingredients': [ingredientSchema],

    'instructions': String,
    'tags': String,
    'img': String,
    'video': String
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);


module.exports = {
    cocktailSchema: cocktailSchema,
    Cocktail: Cocktail
}