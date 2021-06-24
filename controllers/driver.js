var messagebird = require('messagebird')('Aqe6EW5qCpafjODec7iqHxNhT');
const {getvalues} = require("../functions/functions");
const con = require('../functions/dbConnection.js');

exports.driverHome = (req, res) => {
  res.render('driverHome');
};

exports.otp = async (req, res) => {
	var date = new Date().toISOString().slice(0, 19).replace('T', ' ').split(' ');
	var values = getvalues(date, req.body);
	values.push(req.cookies.username)
	// console.log(values)
	var sql = 'insert into records(date,start_time,patient_roll,acommopanier1_roll,acommopanier2_roll,driver_id) values (?)';
	
	await con.query(sql, [values], async function (err, result){
      if(err){
      	console.log(err)
        res.send('failure');
      }else{
      	console.log(result)
        var otp = Math.floor(Math.random() * 899999 + 100000);
		var params = {
		   originator : 'TestMessage',
		   recipients : ['+919521420803' ],
		   body : otp
		}
		messagebird.messages.create(params, function (err, response) {
		   if (err) {
		       // Request has failed
		       console.log(err);
		       res.send("Error occured while sending message!");
		   } else {
		       // console.log(response);
		       res.send('' + otp)
		    }
		});
      }
    });
	
};

exports.confirmotp = (req, res) => {
	if(req.body.cotp === req.body.otp){
		res.send(true)
	}else{
		res.send(false)
	}
	
};

exports.logout = (req,res)=>{
  res.clearCookie('username');
  res.clearCookie('role');
  res.redirect("/");
}