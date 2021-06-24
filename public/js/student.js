//this "socket" var is diff to that on server and "io" obj is made available through lib imported in index.html

var socket = io.connect('https://ambulancetrackerapk.herokuapp.com/');

var checkButton = document.getElementById('checkAvailibilty');
var status = document.getElementById('status');
var message = document.getElementById('message');
var edit = document.getElementById('edit');
var cancel = document.getElementById('cancel');

edit.addEventListener('click', function(){
  document.getElementById('form').classList.remove('d-none');
  document.getElementById('userDropdown').classList.add('d-none');
  document.getElementById('checkavail').classList.add('d-none');
});

cancel.addEventListener('click', function(){
  document.getElementById('form').classList.add('d-none');
  document.getElementById('userDropdown').classList.remove('d-none');
  document.getElementById('checkavail').classList.remove('d-none');
});

//check flag value on click
checkButton.addEventListener('click', function(){
  socket.emit('checkAvailibilty');
});

//recieving flag value for Availability of ambulance, data.available == true (in case of Availability)
socket.on('availabiltyStatus', function(data){
  if(data.available === 1){
      message.innerHTML="<br> <br><span style='font-size:20px'>Ambulance is available at the moment. <br> Please contact the Care Taker.</span>";
  }
  else{
    message.innerHTML="<br> <br><span style='font-size:20px'>Ambulance is unavailable at the current moment. </span>";
  }
  console.log(data);
})
