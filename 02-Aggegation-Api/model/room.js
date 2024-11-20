const mongoose = require("mongoose");

const roomModel = new mongoose.Schema({
    roomName:{
        type: String,
        required: true
    },
    roomNumber:{
        type: Number,
        required: true
    },
    roomType:{
        type: String,
        enum: ["Standard", "Deluxe", "Luxury"],
    },
    bed:{
        type: String,
        enum: ["Single", "Double", "Triple", "Quad"],
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    roomDescription: {
        type: String,
        required: true
    },
    roomImage: {
        type: String,
        required: true
    },
   
    // avaliable: [
    //     {
    //     fromDate: {
    //         type: Date,
    //         required: true
    //     },
    //     toDate: {
    //         type: Date,
    //         required: true
    //     },
    //     isAvaliable: {
    //         type: Boolean,
    //         default: true
    //     }
    // }
    // ]

},{timestamps: true});

module.exports = mongoose.model("rooms", roomModel);
