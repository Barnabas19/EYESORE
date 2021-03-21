var express = require('express');
var config = require('./server/configure');
var mongoose = require('mongoose');
var database = require('./database');
var data = require('./data.json');

var app = express();  //CREATE MY APP

//SETTINGS FOR MY APP
app.set('port', process.env.PORT || 3900);
app.set('views', `${__dirname}/views`);

app = config(app)  //CONFIGURE MY APP

//CONNECTING TO THE MONGODB SERVER
//replace ........... with process.env.DB_URL
mongoose.connect("mongodb://localhost/eyeSore");
mongoose.connection.on('open', function(){
    console.log('Mongoose is connected.');
});

//TURN ON NETWORK FEATURE ON MACHINE VIA NODE.JS
app.listen(app.get('port'), function(){
    console.log(`Server is listening on http://localhost:${app.get('port')}`);
});

database(data);