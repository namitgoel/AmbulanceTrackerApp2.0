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
  select.addEventListener('availabilityStatus', available);
  function available(){
    const avail=data.value;
    if(avail === 'true'){
      alert("Ambulance is available");
    }
    else{
      alert("Ambulance is unavailable at the moment");
    }
  }
  console.log(data);
})
