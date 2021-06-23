var con = require("../functions/dbConnection.js");
var {hashPassword} = require("../functions/functions.js");
const { validationResult } = require('express-validator');

exports.studentHome = (req,res) => {
  console.log("heloo");
  res.render('studentHome',{ message: ""});
};


exports.editProfile = async (req, res) => {
  console.log("Hello!");
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //console.log(errors.array()[0].msg + " in " + errors.array()[0].param);
      return res.render('studentHome',{ message: errors.array()[0].msg + " in " + errors.array()[0].param });
    }
  try{
    var encry_pass = await hashPassword(req.body.password);
    var sql = "update student set email = '" + req.body.email +"',password = '" + encry_pass +
    "', mobile = " + req.body.mobile + " where roll_no = " + req.body.roll_no + ";";

    console.log(sql);

    await con.query(sql, (err,result)=>{
        if(err){
          console.log(err);

          res.render('studentHome',{message: "database issue"});
        }else{

          res.render('studentHome',{message: "successfully updated!....if not, enter correct roll number and try again"});
              }
    });
  }catch(err){
    console.log(err);

    res.render('studentHome',{message: "internal error.....try again later!"});

  }

};

exports.logout = (req,res)=>{
  res.clearCookie('username');
  res.clearCookie('role');
  res.redirect("/");
}
