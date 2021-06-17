const con = require('../functions/dbConnection.js');
const {getQuery} = require('../functions/query');
const bcrypt = require("bcrypt");
const {hashPassword} = require("../functions/functions");

exports.home = (req,res) =>{
  res.render('authHome');
}

exports.records = async (req,res) =>{
	var sql = "select * from records";

	await con.query(sql, async function (err, result){
      if(err){
        throw err;
      }else{
      	res.render('records', {records: result})
      }
  	})
}

exports.renderForm = (req,res)=>{
  res.render('authRegister');
}

exports.register = async (req,res)=>{
  var sql = "INSERT INTO student(roll_no, name, email, password, mobile) VALUES (?)";
  try
  {
    var password = await hashPassword(req.body.password);
    const values = [req.body.rollno, req.body.name, req.body.email, password, req.body.mobile];
  
    await con.query(sql, [values], async function (err, result){
      if(err){
        throw err;
      }else{
        res.render('authRegister', {message: "Student registered successfully!!!!"})
      }
    });
  }
  catch(error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}

exports.registercsv = async (req,res)=>{
  delete req.body.filename
  var x = req.body;
  var values = []
  for(let key of Object.values(x)){
    if(key){
      values.push(key)     
    }
  }

  var sql = "INSERT INTO student(roll_no, name, email, password, mobile) VALUES ?";
  const index = values.indexOf("\r");
  if (index > -1) {
    values.splice(index, 1);
  }

  for(var i=0;i<values.length;i++){
    try{
      values[i][3] = await hashPassword(values[i][3]);
      values[i][4] = values[i][4].replace(/\r/g, '');
    }
    catch(error)
    {
      console.log(error);
      res.sendStatus(500);
    }
  }

  try
  {
    await con.query(sql, [values], async function (err, result){
      if(err){
        console.log(err)
        res.redirect("/authority/")
      }else{
        res.redirect("/authority/register")
      }
    });
  }
  catch(error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}