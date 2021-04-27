let express = require("express");
let router = express.Router();
let authController = require("../controllers/authController");
let {isEmail, hasPassword, hasName} = require("../validation/validator");
let passportJWT = require("../middleware/passportJWT")();

router.post("/login", authController.login);
router.post("/signup", [isEmail, hasPassword, hasName], authController.signup);
router.get("/me", passportJWT.authenticate(),authController.me);

module.exports = router;