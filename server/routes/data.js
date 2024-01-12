const express = require("express")
const Recipe = require("../models/schema")
const multer = require('multer');
const path = require("path")



const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'img');
},
filename:  (req, file, cb) => {
 
    cb(null, file.originalname);
}

})

const upload = multer({storage : storage}).single("image");

const app = express.Router()

// CREATE METHOD 
app.post("/recipe",(req,res)=>{
  
  upload(req,res,(err)=>{
    if (err) {
      console.log(err)
    }
    else {
      const NewRecipe = new Recipe ({
        id : req.body.id,
        name : req.body.name,
        dishType : req.body.dishType,
        ingrediants : req.body.ingrediants,
        inscructions : req.body.inscructions,
        image :`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,    
          
   })  
     
    NewRecipe.save()
    .then(()=>{
      res.status(201).json({message: 'Recipe created successfully'})
     })
     .catch((error)=>{
      res.status(500).json({error: 'Failed to create Recipe'})
      console.log(error)
     })
    }
  })
  

  
})

app.post('/upload', (req, res) => {
  // Access the uploaded file details
  upload(req,res,(err)=>{
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // You can save the file details or perform other actions here

  return res.send('File uploaded successfully.');
  })
});

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

 app.get("/recipes/:dishType",async (req,res)=>{


  const typeDish = req.params.dishType.toString()
  try {    
    const recipeFilter = await Recipe.find({dishType : typeDish})
    return res.status(200).json({
      success : true,
      data : recipeFilter
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      error : error.message
    })
  }
})


 app.get('/image/:id', (req, res) => {
     const id = req.params.image
  try {
    const image = Recipe.findById(id);
    if (!image) {
        return res.status(200).json({ message :'Image not found.'});
    }
    res.render('afficher-image', { image });
} catch (error) {
    return res.status(404).json( {error :'Error finding image.'});
}
});

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