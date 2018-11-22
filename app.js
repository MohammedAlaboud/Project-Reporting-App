var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/meetingApp';

//permanent routes file to connect to 
var routes = require('./routes/index');

mongoose.connect(db);

// Setup View Engine
var swig = require('swig'); //templating engine to display views
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views')); //tells express where to look for swig files
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public'))); //static path for public dirctory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', routes); //must declare after body-parser

app.listen(port, function() {
  console.log('app listening on port ' + port);
});