const express = require("express")
const Recipe = require("../models/schema")


const app = express.Router()

// CREATE METHOD 
app.post("/recipe",(req,res)=>{
   const NewRecipe = new Recipe ({
    name : req.body.name,
    dishType : req.body.dishType,
    ingrediants : req.body.ingrediants,
    inscructions : req.body.inscructions,
    image : req.body.image
   })
   NewRecipe.save()
   .then(()=>{
    res.status(201).json({message: 'Recipe created successfully'})
   })
   .catch((error)=>{
    res.status(500).json({error: 'Failed to create Recipe'})
    console.log(error)
   })
})

// READ METHOD 

app.get("/recipe",(req,res)=>{
   Recipe.find()
   .then((Recipes)=>{
    res.status(200).json(Recipes)
   })
   .catch((error)=>{
    res.status(500).json({ error : "Failed to retrieve recipes "})
    console.log(error)
   })
})

app.get("/recipe/:id",(req,res)=>{
    Recipe.findById(req.params.id)
    .then((Recipe)=>{
        if (Recipe) {
            res.status(200).json(Recipe)
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
     
    })
    .catch((error)=>{
     res.status(500).json({ error : "Failed to retrieve recipes "})
     console.log(error)
    })
 })

// UPDATE METHOD
app.put("/recipe/:id",(req,res)=>{
   Recipe.findByIdAndUpdate(req.params.id,req.body)
   .then(()=>{
    res.status(200).json({message : "Recipe updated successfully"})
   })
   .catch((error)=>{
    res.status(500).json({ error : "Failed to update recipes "})
    console.log(error)
   })
})
// DELETE METHOD
app.delete("/recipe/:id",(req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
   .then(()=>{
    res.status(200).json({message : "Recipe deleted successfully"})
   })
   .catch((error)=>{
    res.status(500).json({ error : "Failed to delete recipes "})
    console.log(error)
   })
})


module.exports = app