var express = require("express");
var router = express.Router();
const {driverHome, otp, confirmotp, logout} = require("../controllers/driver");
const {isDriver}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')

router.get("/",[isLoggedIn, isDriver], driverHome);

router.post("/otp",[isLoggedIn, isDriver], otp);

router.post("/confirmotp",[isLoggedIn, isDriver], confirmotp);

router.post("/logout", [isLoggedIn, isDriver], logout);


module.exports = router;
