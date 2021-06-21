var con = require("../functions/dbConnection.js");
var {hashPassword} = require("../functions/functions.js");
exports.studentHome = (req,res) => {
  console.log("heloo");
  res.render('studentHome');
};


exports.editProfile = async (req, res) => {
  try{
    var encry_pass = await hashPassword(req.body.password);
    var sql = "update student set email = '" + req.body.email +"',password = '" + encry_pass +
    "', mobile = " + req.body.mobile + " where roll_no = " + req.body.roll_no + ";";

    await con.query(sql, (err,result)=>{
        if(err){
          console.log(err);
          console.log('database issue.....try again later!');
          res.redirect('/student');
        }else{
          console.log('successfully updated!');
          res.redirect('/student');      }
    });
  }catch(err){
    console.log(err);
    console.log('internal error.....try again later!');
    res.redirect('/student');

  }

};
