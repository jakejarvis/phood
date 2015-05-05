// Initialization
var newrelic = require('newrelic');
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var path = require('path');
var http = require('https');
var fs = require('fs');
var vm = require('vm');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs and direct it to /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

// use /public for static files like images, CSS, JS
app.use(express.static(__dirname + '/public'));

// allows placement of dynamic New Relic Browser JS in header
app.locals.newrelic = newrelic;

// WE HAVE SPLIT UP THE REST OF THE FILE INTO OUR OWN MODULES THAT WE require() AND THEN CALL THEIR execute() FUNCTION

// homepage module
var home = require('./home');
home.execute(app);

// restaurant module
var restaurant = require('./restaurant');
restaurant.execute(app, http);

// text message module
var twilio = require('./twilio');
twilio.execute(app);

// favorites module
var favorites = require('./favorites');
favorites.execute(app);



app.listen(process.env.PORT || 3000);
