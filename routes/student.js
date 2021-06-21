var express = require("express");
var router = express.Router();
const {studentHome, editProfile} = require("../controllers/student");
const {checkPassword} = require("../middlewares/functions");
const { body, validationResult } = require('express-validator');

router.get("/",studentHome);
router.post("/update",
              checkPassword,
              body('email').isEmail(),
              body('password').isLength({ min: 5 }),
              body('mobile').isLength({ min: 10, max: 10 }),
              editProfile);

module.exports = router;
