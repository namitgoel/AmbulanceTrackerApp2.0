const con = require('../functions/dbConnection.js');
var mysql = require('mysql');
// const {hashPassword} = require("../functions/functions");
const {getQuery} = require('../functions/query');
const bcrypt = require("bcrypt");


exports.login = (req,res) =>{
  res.render('login');
}


exports.sigin = async (req,res) =>{
  // console.log(await hashPassword('admin'));
  console.log(req.body);
  try
  {
    var values = [req.body.email];
    var role = req.body.role;
    var sql = getQuery(role);
    // console.log(sql);
    await con.query(sql, values, async function (err, result){
      if(err){
        throw err;
      }else{
        try
        {
          if(result.length === 0){
            res.redirect("/");
          }else{
            const match = await bcrypt.compare(req.body.password, result[0].password);
            if(match){
              res.cookie('username', values[0]);
              res.cookie('role', role);
              req.username = values[0];
              req.role = role;
              // console.log(req);
              // console.log('/' + role + '/');
              res.redirect("/" + role + "/");
            }else{
              res.redirect("/");
            }
          }
        }
        catch(error)
        {
          console.log(error);
          res.sendStatus(500);
        }
      }
    });
  }
  catch(error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}
