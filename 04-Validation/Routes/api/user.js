const express = require("express");
const {user, deleteUser, createUser, updateUser, login} = require("../controller/user");
const upload = require("../../multer/fileupload");
const router =express.Router();
const {loginValidation, registerValidation} = require("../../validation/user");
const handleValidationErrors = require("../../error/error");

// User Regsiter
router.get("/user", user)
router.post("/user/create",upload.single('image'),registerValidation,handleValidationErrors, createUser)
router.put("/user/update/:id", updateUser)
router.delete("/user/delete/:id", deleteUser)

// USer Login
router.post("/user/login",loginValidation,handleValidationErrors, login);


module.exports = router;