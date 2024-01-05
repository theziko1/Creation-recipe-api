const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const app = express()
dotenv.config();

const PORT = process.env.PORT 


mongoose.connect(process.env.MONGO_URL )
    .then(()=>{
        console.log("connected to Database");
    })
    .catch(  (error) => {
        console.log("Error connecting to MongoDB:", error);
    })






app.listen(PORT,()=>{
    console.log("server connected in Port "+PORT)
})