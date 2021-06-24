let map;
var socket = io.connect('https://ambulancetrackerapk.herokuapp.com/');
var latitude = 26.082301516170155, longitude = 91.55944356559085;

socket.on('ambulanceCoord',function(data){
	latitude = data.coord.lat;
	longitude = data.coord.lng;
	initMap()
})

function initMap() {
	var coord = { lat: latitude, lng: longitude };
	// alert(coord)
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
