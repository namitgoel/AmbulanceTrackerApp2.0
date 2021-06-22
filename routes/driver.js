var express = require("express");
var router = express.Router();
const {driverHome} = require("../controllers/driver");

router.get("/",driverHome);

module.exports = router;
