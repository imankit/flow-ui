var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var path = require('path');

//============= app level middlewares ================ //
mongoose.connect(database.remoteUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({'extended': true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(express.static('public'));

//============ session ============//
app.use(session({ secret: 'flowuisecret',resave: true,
    saveUninitialized: true})); // session secret

// ============ Routes =========== //
app.use('/api',require('./app/routes')())


app.use(function(req,res,next){
	res.status(404).sendFile(path.join(__dirname,'./public/','404.html'));
})

server.listen(port, function () {
  console.log( "CloudBoost Flow running on :" + port )
});