var express = require('express');

//home and image ARE OBJECTS OF CONTROLLERS
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports = function(app){
    var router = express.Router();
    router.get('/', home.landing);
    router.post('/images', image.showImages);
    router.get('/images', image.showRecentImage);
    router.get('/upload', image.upload);
    router.post('/new-image', image.view);

    app.use(router);
}