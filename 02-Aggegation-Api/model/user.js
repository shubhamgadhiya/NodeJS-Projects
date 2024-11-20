const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
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
    },
    mobile: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }

},{timestamps: true});

module.exports = mongoose.model("users", userModel);