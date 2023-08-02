const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    'item': String,
    'portion': String
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports.ingredientSchema = ingredientSchema
module.exports.Ingredient = Ingredient