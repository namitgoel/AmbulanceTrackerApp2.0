var express = require("express");
var router = express.Router();
const {studentHome, editProfile, logout} = require("../controllers/student");
const {checkPassword} = require("../middlewares/functions");
const { body, validationResult } = require('express-validator');
const {isStudent}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')

router.get("/",[isLoggedIn, isStudent],studentHome);
router.post("/update",[isLoggedIn, isStudent],
              checkPassword,
              body('email').isEmail(),
              body('password').isLength({ min: 5 }),
              body('mobile').isLength({ min: 10, max: 10 }),
              editProfile);

router.post("/logout", [isLoggedIn, isStudent], logout);

module.exports = router;
