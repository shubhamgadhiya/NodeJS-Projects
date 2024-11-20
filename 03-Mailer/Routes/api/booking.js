const express = require('express');
const router = express.Router();
const {booking, CreateBooking} = require("../controller/booking");

router.get("/booking", booking );
router.post("/booking/create", CreateBooking);

module.exports = router;