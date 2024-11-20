const { body } = require('express-validator');


const loginValidation = [
    body("email").optional().isEmail().withMessage("Please enter a valid email address"),
    body("mobile").optional().isMobilePhone('any').withMessage("Please enter a valid mobile number"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
]
const registerValidation = [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("FirstName is required"),
    body("lastName").notEmpty().withMessage("LastName is required"),
    body("mobile").notEmpty().withMessage("Mobile is required"),
    body("image").notEmpty().withMessage("Image is required"),
]


module.exports = {loginValidation, registerValidation};