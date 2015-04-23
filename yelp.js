// get location - google
/* Google maps api for yelp
        Dane Roberts
        4/14/2014
*/

    var yelp = require("../index").createClient({
        consumer_key: "JjHX6g8j-dvdM67mxWrcrQ",
        consumer_secret: "BHffWCP9KemQ-AM8-eydDWHPB5s",
        token: "tsAY0CK8SH8RDao-7sO8RO0AdbLYsPaJ",
        token_secret: "loCcp306MHzX38_blAOQmkCVxas"
    });
 
// find restaurant - yelp
function findRestuarants() {

    yelp.search({location: myLat+myLng}, function(error, data){
        console.log(error);
        console.log(data);
        restaurants = data;

    });
}

/*
function makeMarkers()
{
    for (i = 0; i < locations.length; i++) {
        var loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        dist = getDistance(locations[i].lat, locations[i].lng);
        
        message = locations[i].login + " is " + dist + " mi away from you";
        createMarker(loc, message);

    }
    map.panTo(me);
}

function createMarker(location, msg)
{
    var marker = new google.maps.Marker({
        map: map,
        position: location,
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(msg);
        infoWindow.open(map, marker);
    });
}

*/
// get other location 

// find restaurant - yelp



// send location to insta


