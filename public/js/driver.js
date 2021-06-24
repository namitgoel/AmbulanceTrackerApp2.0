var  startRide = document.getElementById('start');
var endRide = document.getElementById('end');
var form = document.getElementById('form');
var otp = document.getElementById('otp');
var tracker;
var socket;
//start emitting location coor.
startRide.addEventListener('click', sendLocation);

//end emitting location coor.
endRide.addEventListener('click',stop);


//functions
function sendLocation(){
  socket = io.connect('https://ambulancetrackerapk.herokuapp.com/');
  tracker = setInterval(getLocation, 10000);
  startRide.classList.add('d-none');
  // endRide.classList.remove('d-none');
  form.classList.remove('d-none');
  alert("Ride Initiated\nPlease fill the form!!!")
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
  location.reload();
  startRide.classList.remove('d-none');
  endRide.classList.add('d-none');
  form.classList.add('d-none');
}

function submitdata(event){
   event.preventDefault();
  // console.log(document.getElementById('roll_no').val())
  var formdata = {
    patient: document.getElementById('roll_no').value,
    acmp1: document.getElementById('acmp1').value,
    acmp2: document.getElementById('acmp2').value
  }
  // console.log(56)
  // alert(formdata);
    $.ajax({
      url: "/driver/otp/",
      type: "POST",
      data: formdata,
      success: function (data) {
        document.getElementById('cotp').value = data;
        alert(data)
      }
    });
    form.classList.add('d-none');
    otp.classList.remove('d-none');
  }

  function otpdata(event){
    event.preventDefault();
    var otpdata = {
      cotp: document.getElementById('cotp').value,
      otp: document.getElementById('otpip').value
    }
     $.ajax({
      url: "/driver/confirmotp/",
      type: "POST",
      data: otpdata,
      success: function (data) {
        if(data === true){
          otp.classList.add('d-none');
          endRide.classList.remove('d-none');
        }else{
          alert('Enter Valid OTP!!!')
          document.getElementById('otpip').value = "";
        }
      }
    });
  }
$("#submitbtn").click(submitdata);
$("#otpbtn").click(otpdata);
