var myLat;
var myLng;


function init() {

    var map_canvas = document.getElementById("map_canvas");
    var tufts = new google.maps.LatLng(42.406484, -71.119023);
    var options = {zoom: 15, center: tufts};

    gmap = new google.maps.Map(map_canvas, options);


    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            renderMap();
        });
    } else {
        alert("Please try a different browser.");
    }
    
}

function renderMap() {
    me = new google.maps.LatLng(myLat, myLng);
    gmap.panTo(me);

    marker = new google.maps.Marker({
        position: me,
        title: "This is me, ",
        icon: "img/carrot.png"
    });
    marker.setMap(gmap);

    google.maps.event.addListener(marker, 'click',
        function() {
            info.close();
            info.setContent(this.title);
            info.open(gmap, this);
        }
    );
}