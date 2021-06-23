const bcrypt = require('bcrypt');
const con = require('./dbConnection.js');
exports.hashPassword = async (password) => {
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }catch{
    res.status(500).send('not working');
  }
};

exports.getvalues = (date, req) => {
  try{
  	var values = [date[0], date[1],req.patient];
  	if(req.acmp1 === '' && req.acmp2 === ''){
  		values.push('none');
  		values.push('none');
  		// console.log(values)
  	}
  	if(!(req.acmp1 === '') && req.acmp2 === ''){
  		values.push(req.acmp1);
  		values.push('none');
  		// console.log(values)
  	}
  	if(req.acmp1 === '' && !(req.acmp2 === '')){
  		values.push('none');
  		values.push(req.acmp2);
  		// console.log(values)
  	}
    if(!(req.acmp1 === '') && !(req.acmp2 === '')){
      values.push(req.acmp1);
      values.push(req.acmp2);
      // console.log(values)
    }

  	return values;
  }catch{
    res.status(500).send('not working');
  }
};

//
// exports.checkStatus = async () => {
//   try{
//     var sql = 'select available from temp_data where ambulance_no = 1;';
//     await con.query(sql, (err,result)=>{
//         if(err){
//           console.log(err);
//
//         }else{
//           result = JSON.parse(JSON.stringify(result));
//           //console.log(result[0].available);
//           var x = result[0].available;
//           return x;
//        }
//     });
//
//   }catch(err){
//     console.log(err);
//   }
// }
