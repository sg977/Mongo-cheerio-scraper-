
// Node Dependencies
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

//debugger
var logger = require('morgan'); 

var app = express();

// Initialize Express for debugging & body parsing
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

//static content
app.use(express.static(process.cwd() + '/public'));

//express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//database configuration with MongoDB
mongoose.connect('mongodb://heroku_47bfwr61:in1v49reqtlk8m0rrj31ep1sae@ds161322.mlab.com:61322/heroku_47bfwr61');
// mongoose.connect('mongodb://localhost/mongoCheerio');

//check mongoose for errors
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success connect message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var routes = require('./controllers/controller.js');
app.use('/', routes);


//app connects at localhost 3000
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});