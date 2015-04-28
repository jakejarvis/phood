// Initialization
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs and direct it to /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

// use /public for static files like images, CSS, JS
app.use(express.static(__dirname + '/public'));

// Mongo initialization and connect to database
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/phood';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

// homepage 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// restaurant page 
app.get('/restaurant', function(req, res) {
    var id = req.param('id'); // get id parameter from url (/restaurant?id=xxxxxxx)

    res.render('pages/restaurant', {name: "Chipotle", id: id});
});

app.listen(process.env.PORT || 3000);
