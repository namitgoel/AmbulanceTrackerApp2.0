// const con = require('../functions/dbConnection.js');
// const bcrypt = require("bcrypt");

exports.login = (req,res) =>{
  res.render('login');
}


exports.sigin = (req,res) =>{
  console.log(req.body);
  res.render('login');
}

