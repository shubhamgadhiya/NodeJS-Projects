const mongoose = require("mongoose");

const bookingRoomModel = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true
    },
    fromDate:{
        type: Date,
        required: true
    },
    toDate:{
        type: Date,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("bookingRooms", bookingRoomModel);