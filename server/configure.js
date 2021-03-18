var express = require('express');

//GET SOME MIDDLEWARES AND NODE.JS NATIVES, ETC
var path = require('path');
var routes = require('./routes');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var moment = require('moment');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var Handlebars = require('handlebars');

module.exports = function(app){
    app.use(morgan('dev')); 
    app.use(bodyParser.urlencoded({'extended': true})); 
    app.use(bodyParser.json()) 
    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).single('file'));
    app.use(methodOverride());  
    app.use(cookieParser('some-secret-value-here'));  
    routes(app);  
    app.use('/public', express.static(path.join(__dirname, '../public'))); 

    if('development' === app.get('env')){
        app.use(errorHandler()); 
    }
    app.engine('handlebars', exphbs.create({  //CONFIGURING SERVER-SIDE TEMPLATING ENGINE
        defaultLayout: 'main', 
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {    
            timeago: function(timestamp){
                return moment(timestamp).startOf('minute').fromNow();  
            }
        },
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }).engine);
    app.set('view engine', 'handlebars');
    
    return app;
}
