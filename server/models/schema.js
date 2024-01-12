const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
       

const RecipeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
    name : {
        type: String,
        required: true,
        unique : true,
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
    image:  {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Recipe = mongoose.model("Recipe",RecipeSchema)

module.exports = Recipe