require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cookie_parser = require("cookie-parser");
const {checkStatus} = require('./functions/functions');
const studentHome = require('./routes/student');
// const driverRoutes = require('./routes/driver');
const loginPage = require('./routes/login');
// const adminRoutes = require("./routes/admin");
// const {alterFlag, startLatLng, endLatLng, getLocation} = require("./functions/functions");
var socket = require("socket.io");
const session = require('express-session');
const flash = require('connect-flash');
const con = require('./functions/dbConnection.js');

var bodyParser = require("body-parser");
var urlencodedparser = bodyParser.urlencoded({extended: false});
const app = express();

const port = process.env.PORT;


// using static files and other stuffs
app.use('/public', express.static('public'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookie_parser());
//
// app.use(express.session({ cookie: { maxAge: 60000 }}));
// app.use(flash());



// using routes
app.use("/", loginPage);
app.use("/student", studentHome);

//sockets
var socket = require('socket.io');



//firing up the server
var server = app.listen(port, () => {
  console.log('app listening on port: ' + port)
})

var io = socket(server);

//here socket = the particular socket established between client and server
io.on('connection' , function(socket){
  console.log(`connection established between server and client @ ${socket.id}`);

  //socket b/w student and server
  socket.on('checkAvailibilty',async function(){
    console.log("sending ambulance status....");
    //emitting status
    try{
      var sql = 'select available from temp_data where ambulance_no = 1;';
      await con.query(sql, (err,result)=>{
          if(err){
            console.log(err);

          }else{
            result = JSON.parse(JSON.stringify(result));
            //console.log(result[0].available);
            var available = result[0].available;
            console.log(available);
            socket.emit('availabiltyStatus',{available: available});
          }
        });
      }catch(err){
        console.log(err);
      }
  });
});
// app.use("/student", studentRoutes);
// app.use("/driver", driverRoutes);
// app.use("/login", loginRoutes);
// app.use("/admin",adminRoutes);





//socket.io
//
// var io = socket(server);
//
// //here socket = the particular socket established between client and server
// io.on('connection' , function(socket){
//   console.log(`connection established between server and client @ ${socket.id}`);
//
//   socket.on('setflag', function(data){
//       var flag = alterFlag(data);
//     console.log(flag);
//     // //io.sockets refers to all the sockets connected to the server
//     // io.sockets.emit('chat', data);
//     // io.sockets.emit('clear');
//   });
//
//   //Getting coordinates while ride in progress
//   socket.on('rideInProgress',function(data){
//     if(data != null){
//       startLatLng(data);
//       //emitting to authority
//       socket.broadcast.emit('rideInProgress',data);
//       console.log("Location: " + getLocation());
//     }
//
//
//   });
//
//   // Getting end coordinates on end ride
//   socket.on("endride",function(data){
//     if(data != null){
//       endLatLng(data);
//       socket.broadcast.emit('endride',data);
//       console.log("end coord" + data);
//     }
//
//   });
//
//   //when student books a ride
//   socket.on("book", ()=>{
//       var flag = alterFlag(true);
//       socket.broadcast.emit("book");
//   });
//
// });
//
//


// var select = process.env.SELECT;


//connecting to the database
// var con = mysql.createConnection({
//  
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: 3306

// });


// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to database!");

// });



// con.query(select, function (err, result) {
// 	if (err) throw err;
// 	console.log(result);
// });
