const mongoose = require("mongoose")
const schema = mongoose.Schema

const usersDb = new schema ({
    username : {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model("user" , usersDb)