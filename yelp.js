// get location - google
/* Google maps api for yelp
        Dane Roberts
        4/14/2014
*/
    var myLat = 0;
    var myLng = 0;
    var request = new XMLHttpRequest();
    var me = new google.maps.LatLng(myLat, myLng);
    var mapOptions = {
        center: me,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map;
    var myMarker;
    var places;
    var locations;
    var infoWindow = new google.maps.InfoWindow();
    var message;
    var restaurants; 
 
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

/*
    var http = new XMLHttpRequest();
    var url = "http://api.yelp.com/v2/search?cll=" + myLat + myLng;
    http.open("GET", url, true);
    http.set setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
    http.onreadystatechange = function() {
        if(http.readyState = 4 && http.status == 200) {
            restaurants = JSON.parse(http.responseText);
            makeMarkers();
        }
    };*/
}


function init()
{
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    getMyLocation();
}

function getMyLocation()
{
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            renderMap();
            //sendLocation();
        });
    }
    else {
        alert("Geolocation is not supported by your browser");
    }
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);
    map.panTo(me);
    var myImage = // insert image name here
    myMarker = new google.maps.Marker({
        position: me,
        icon: myImage,
        title: "I AM HERE"
    });
    google.maps.event.addListener(myMarker, 'click', function() {
        infoWindow.open(map, myMarker);
    });
    myMarker.setMap(map);
}

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

// sourced from http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
function getDistance(lat, lng) {

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };
    var R = 3959; // mi 
    var x1 = lat - myLat;
    var dLat = x1.toRad();
    var x2 = lng - myLng;
    var dLon = x2.toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat.toRad()) * Math.cos(myLat.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d.toFixed(2);
}

// get other location 

// find restaurant - yelp



// send location to insta


