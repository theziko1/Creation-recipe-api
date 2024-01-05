const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    dishType : {
        type: String,
        required: true
    },
    ingrediants : {
        type: [String],
        default: [],
        required: true
    },
    inscructions : {
        type: [String],
        default: [],
        required: true
    },
    image: {
        type: Buffer,
        required: true
     },
    
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Recipe = mongoose.model("Recipe",RecipeSchema)

module.exports = Recipe