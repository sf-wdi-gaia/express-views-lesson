var express = require('express');
var path = require('path'); // lets us normalize path strings to different views
// var logger = require('morgan'); // for debugging
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override'); // allows POST method to be used for PUT and/or DELETE

var helpers = require('express-helpers'); // we can use <%- link_to ... %> and other methods similar to ERB in Rails
helpers(app);  // turns it on

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app-demo');

var routes = require('./config/routes');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up our app to accept to use EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.use(routes);

app.listen(3000);
