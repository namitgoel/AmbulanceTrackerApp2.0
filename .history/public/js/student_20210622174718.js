//this "socket" var is diff to that on server and "io" obj is made available through lib imported in index.html

var socket = io.connect('http://localhost:3000');

var checkButton = document.getElementById('checkAvailibilty');
var status = document.getElementById('status');
var message = document.getElementById('message');

//check flag value on click
checkButton.addEventListener('click', function(){
  socket.emit('checkAvailibilty');
});

//recieving flag value for Availability of ambulance, data.available == true (in case of Availability)
socket.on('availabiltyStatus', function(data){
  // if(data.available === 1){
  //     message.innerHTML="Ambulance is available at the moment. Please contact the Care Taker.";
  // }
  // else{
  //   message.innerHTML="Ambulance is unavailable at the current moment.";
  // }
  console.log(data);
})
