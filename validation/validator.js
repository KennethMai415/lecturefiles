let {body} = require("express-validator");

exports.hasDescription = body("description")
    .isLength({min:5})
    .withMessage("Description is required. min length 5 chars");

exports.isEmail = body("email")
    .isEmail()
    .withMessage("email field must contain correct email");

exports.hasPassword = body("password")
    .exists()
    .withMessage("password cant be empty");

exports.hasName = body("name")
    .isLength({min:5})
    .withMessage("Name is required");