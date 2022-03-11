const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT || 3000;
const rMovies = require("./routers/movie")



mongoose.connect("mongodb://localhost:27017/new_project")

const db = mongoose.connection

db.on("open" , ()=>{
    console.log("mongodb running");
})

db.on("error" , (error)=>{
    console.log(error);
})



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(rMovies)



app.listen(port , ()=>{
    console.log("Server running");
})