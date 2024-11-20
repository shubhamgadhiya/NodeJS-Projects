const express = require("express");
const {user} = require("../controller/user");
const router =express.Router();

router.get("/user", user)

module.exports = router;