var express = require("express");
var router = express.Router();
const {login, sigin} = require("../controllers/login");


router.get("/",login);

router.post("/sigin",sigin);

module.exports = router;