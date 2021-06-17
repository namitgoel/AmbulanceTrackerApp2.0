var express = require("express");
var router = express.Router();
const {home, records, renderForm, register, registercsv} = require("../controllers/auth");


router.get("/", home);

router.get("/records", records);

router.get("/register", renderForm);

router.post("/registerStudent", register);

router.post("/registercsv", registercsv);
module.exports = router;