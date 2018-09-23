
// Node Dependencies
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var PORT = 3000; 

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
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_47bfwr61:in1v49reqtlk8m0rrj31ep1sae@ds161322.mlab.com:61322/heroku_47bfwr61";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });


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
// var port = process.env.PORT || 3000;
// app.listen(port, function(){
//   console.log('Running on port: ' + port);
// });
app.listen(process.env.PORT || 3000); 