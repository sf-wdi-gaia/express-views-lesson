var express = require('express');
var path = require('path'); // lets us join views and partials. called on line 23
// var logger = require('morgan');  // helps with debugging. called on line 17
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override'); // allows POST method to call PUT or DELETE from a form

var helpers = require('express-helpers'); // using <%- link_to .... %> also gives us <% form_for... %> like in Rails
helpers(app);

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app');

var routes = require('./config/routes');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set up our app to accept to use EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.use(routes);

app.listen(3000, function(){
    console.log('Connected to server at port 3000');
});