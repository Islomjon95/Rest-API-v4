const mongoose = require("mongoose")
const schema = mongoose.Schema

const cinema = new schema({
 title: {
     type: String,
     default : "noname"
 },
 category: {
     type: String, 
     required: true
 },
 country : {
     type: String,
     default : "Nocountry"
 },
 year: {
     type: Number
 },
 director_id : schema.Types.ObjectId,

 imdb_score: Number
})

module.exports = mongoose.model("movie" , cinema)
