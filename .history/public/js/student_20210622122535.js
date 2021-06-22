//this "socket" var is diff to that on server and "io" obj is made available through lib imported in index.html

var socket = io.connect('http://localhost:3000');

var checkButton = document.getElementById('checkAvailibilty');
var status = document.getElementById('status');

//check flag value on click
checkButton.addEventListener('click', function(){
  socket.emit('checkAvailibilty');
});

//recieving flag value for Availability of ambulance, data.available == true (in case of Availability)
socket.on('availabiltyStatus', function(data){
  console.log(data);
})

$(document).ready(function() {
  $("#formButton").click(function() {
    $("#form1").toggle();
  });
});