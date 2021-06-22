var  startRide = document.getElementById('start');
var endRide = document.getElementById('end');
var tracker;
var socket;

// startRide.addEventListener('click', function(){
//   document.getElementById('startride').classList.add('d-none');
//   document.getElementById('endride').classList.remove('d-none');
// });

// endRide.addEventListener('click', function(){
//   document.getElementById('startride').classList.remove('d-none');
//   document.getElementById('endride').classList.add('d-none');
// });

//start emitting location coor.
startRide.addEventListener('click', sendLocation);

//end emitting location coor.
endRide.addEventListener('click',stop);


//functions
function sendLocation(){
  socket = io.connect('http://localhost:3000');
  tracker = setInterval(getLocation, 10000);
  document.getElementById('startride').classList.add('d-none');
  document.getElementById('endride').classList.remove('d-none');
}

function test(){
  console.log('h');
}

function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else{
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  socket.emit('liveLocation',{lat:position.coords.latitude, lon:position.coords.longitude});
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function stop(){
  clearInterval(tracker);
  socket.emit('nowAvailable');
  socket.close();
  document.getElementById('startride').classList.remove('d-none');
  document.getElementById('endride').classList.add('d-none');
}