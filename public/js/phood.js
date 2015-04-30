var myLat;
var myLng;
var infoWindow = new google.maps.InfoWindow;

function init() {

    // only do this if we're displaying a map (#map_canvas) on the page
    if($('#map_canvas').length) {
        var map_canvas = document.getElementById("map_canvas");
        var tufts = new google.maps.LatLng(42.406484, -71.119023);  // default center of map is tufts (our best guess)
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

    // re-center map once we get the user's location
    gmap.panTo(me);

    marker = new google.maps.Marker({
        position: me,
        icon: {
            url: "img/bunny.png",
            size: new google.maps.Size(81, 133),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(40, 60)
        }
    });
    marker.setMap(gmap);

    foursquare();
}

function foursquare() {
    $.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + myLat + ',' + myLng + '&categoryId=4d4b7105d754a06374d81259&radius=800&client_id=AHETXZDGE5YWYLLM5AR13UTWC3UXETSPE54UHAOVRNPJLXIT&client_secret=SCLHL3DIHUSWIBWALLQE3TDHMEZUPCPVRV55FEN0WJRBJPU2&v=20150426', {}, function(data) {
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
        icon: {
            url: "img/carrot.png",
            size: new google.maps.Size(24, 60),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(18, 45)
        }
    });

    var url = "restaurant?id=" + place.id + "&name=" + place.name;

    // open pop-up info window (with link to restaurant info) when mouse is over this marker
    google.maps.event.addListener(marker, 'mouseover', function() {
        infoWindow.close();
        infoWindow.setContent('<a href="' + url + '">' + place.name + '</a>');
        infoWindow.open(gmap, this);
    });

    google.maps.event.addListener(marker, 'click', function() {
        console.log("asdfasdf");
        window.location.href = url;
    });

    // close pop-up window when mouse moves away from restaurant
    google.maps.event.addListener(marker, 'mouseout', function() {
        infoWindow.close();
    });
}
