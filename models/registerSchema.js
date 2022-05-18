const mongoose = require('mongoose')

//creating schema for register
const registerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//naming collection in 3rd parameter
module.exports = mongoose.model("user",registerSchema)