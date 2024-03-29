const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const data = require("./routes/data")
const cors = require('cors')
const path = require('path')
const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  
app.use(cors()) 
app.use("/",data)

// dotenv config
dotenv.config();
// PORT
const PORT = process.env.PORT 

// CONNECTED DATABASE
mongoose.connect(process.env.MONGO_URL )
    .then(()=>{
        console.log("connected to Database");
    })
    .catch(  (error) => {
        console.log("Error connecting to MongoDB:", error);
    })





//listening to port
app.listen(PORT,()=>{
    console.log("server connected in Port "+PORT)
})