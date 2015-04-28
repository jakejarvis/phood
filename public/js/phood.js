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

function foursquare(){

    $.getJSON('https://api.foursquare.com/v2/venues/search?ll='+mylat+','+mylng+'&section=food&client_id=AHETXZDGE5YWYLLM5AR13UTWC3UXETSPE54UHAOVRNPJLXIT&client_secret=SCLHL3DIHUSWIBWALLQE3TDHMEZUPCPVRV55FEN0WJRBJPU2&v=20150426', {}, function(data) {
        for(var i=0; i < data.response.venues.length; i++) {
            createMarker(data.response.venues[i]);
        }
    });
}

function createMarker(place) {

    var lat = place.location.lat;
    var lng = place.location.lng;
    var latlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
                    position: latlng,
                    map: gmap,
                    title: place.name
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(place.name);
        infowindow.open(gmap, this);
    });

}
     // console.log(data.response.venues[0].name);
      //id = data.response.venues[0].id;

     // console.log(id);

