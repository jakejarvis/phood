var myLat;
var myLng;
var infoWindow = new google.maps.InfoWindow;
var info = new google.maps.InfoWindow;

function init() {

    // only do this if we're displaying a map (#map_canvas) on the page
    if($('#map_canvas').length) {
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

    
}

function renderMap() {
    me = new google.maps.LatLng(myLat, myLng);
    gmap.panTo(me);

    marker = new google.maps.Marker({
        position: me,
        title: "This is me, ",
        icon: "img/bunny.png"
    });
    marker.setMap(gmap);

    google.maps.event.addListener(marker, 'click',
        function() {
            info.close();
            info.setContent(this.title);
            info.open(gmap, this);
        }
    );
    foursquare();
}

function foursquare() {
    $.getJSON('https://api.foursquare.com/v2/venues/search?ll='+myLat+','+myLng+'&categoryId=4d4b7105d754a06374d81259&radius=800&client_id=AHETXZDGE5YWYLLM5AR13UTWC3UXETSPE54UHAOVRNPJLXIT&client_secret=SCLHL3DIHUSWIBWALLQE3TDHMEZUPCPVRV55FEN0WJRBJPU2&v=20150426', {}, function(data) {
        for(var i = 0; i < data.response.venues.length; i++) {
            console.log(data.response.venues[i].name);
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
                    title: place.name,
                    icon: "img/carrot.png"
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.close();
        infoWindow.setContent('<a href="restaurant?id=' + place.id + '&name='+ place.name + '">' + place.name + '</a>');
        infoWindow.open(gmap, this);
    });

}
     // console.log(data.response.venues[0].name);
      //id = data.response.venues[0].id;

     // console.log(id);

