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
