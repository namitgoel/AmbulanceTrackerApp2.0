var express = require("express");
var router = express.Router();
const {home, records, renderForm, register, registercsv, logout, track} = require("../controllers/auth");
const {isAuthority}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')


router.get("/", [isLoggedIn, isAuthority], home);

router.get("/register", [isLoggedIn, isAuthority], renderForm);

router.get("/track", [isLoggedIn, isAuthority], track);

router.post("/registerStudent", [isLoggedIn, isAuthority], register);

router.post("/registercsv", [isLoggedIn, isAuthority], registercsv);

router.post("/logout", [isLoggedIn, isAuthority], logout);
module.exports = router;