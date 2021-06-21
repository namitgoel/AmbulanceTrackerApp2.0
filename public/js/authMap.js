let map;
var socket = io.connect('http://localhost:3000');
var latitude = 26.082301516170155, longitude = 91.55944356559085;

socket.on('flag',function(data){
	if(data){
		// alert("hello")
		initMap();
		// console.log(document.getElementById("ride").classList.add('d-none'));
		socket.on('location',function(datal){
			latitude = datal[0];
			longitude = datal[1];
		})
	}
	alert(latitude + " " + longitude);

})

function initMap() {
	var coord = { lat: latitude, lng: longitude };
	alert(coord)
	const map = new google.maps.Map(document.getElementById("map"), {
	  zoom: 18,
	  center: coord,
	});

	const marker = new google.maps.Marker({
	  position: coord,
	  map: map,
	  icon: {
		path: google.maps.SymbolPath.CIRCLE,
		scale: 10,
		fillOpacity: 1,
		strokeWeight: 2,
		fillColor: '#5384ED',
		strokeColor: '#ffffff',
  		}
	});
}