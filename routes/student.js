var express = require("express");
var router = express.Router();
const {studentHome, editProfile} = require("../controllers/student");


router.get("/",studentHome);
router.post("/update", editProfile);

module.exports = router;
