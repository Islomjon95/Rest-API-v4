const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT || 3000;
const rMovies = require("./routers/movie")
const rDirector = require("./routers/director")
const rUser = require("./routers/user")
const secretKey = require("./config");



mongoose.connect("mongodb://localhost:27017/new_project")

const db = mongoose.connection

db.on("open" , ()=>{
    console.log("mongodb running");
})

db.on("error" , (error)=>{
    console.log(error);
})

app.set("api_secret_key" , secretKey.api_secret_key)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(rUser)
app.use(rMovies)
app.use(rDirector)




app.listen(port , ()=>{
    console.log("Server running");
})