const express = require("express");
const upload = require("../../multer/fileupload");
const router =express.Router();
const {register, login} = require("../controller/auth");

// User Regsiter
// router.get("/user", user)
router.post("/user/register",upload.single('profilePicture'), register)
router.post("/user/login", login)


module.exports = router;