var ImageModel = require('../models/image');
var path = require('path');
var fs = require('fs');

module.exports = {
    showImages: (req, res)=>{
        var viewModel = {
            images: [],
            route: '/',
            location: 'back'
        }
        if(req.body.category === "ALL CATEGORIES"){
            ImageModel.find({}, {}, {sort: {timestamp: -1}},
                function(err, images){
                    if(err){
                        throw err;
                    }
                    viewModel.images = images;
                    res.render('image', viewModel);
                }
            );
        }else{
            ImageModel.find(
                {category: req.body.category}, {}, {sort: {timestamp: -1}},
                function(err, images){
                    if(err){
                        throw err;
                    }
                    viewModel.images = images;
                    res.render('image', viewModel);
                }
            )
        }
    },
    showRecentImage(req, res){
        var viewModel = {
            images: [],
            notice: 'image upload was successful',
            route: '/',
            location: 'home'
        }
        ImageModel.find(
            {}, {}, {sort: {timestamp: -1}},
            function(err, images){
                if(err){
                    throw err;
                }
                viewModel.images.push(images[0]);
                res.render('image', viewModel);
            }
        )
    },
    upload: (req, res)=>{
        var viewModel = {
            paragraph: "Upload an image"
        }
        res.render('upload', viewModel);
    },
    view: (req, res)=>{
        ImageModel.find(
            {name: req.body.name},
            function(err, images){
                if(err){
                    throw err;
                }
                if(images.length>0){
                    res.send('This name is already being used')  //PLACEHOLDER
                }else{
                    var tempPath = req.file.path;
                    var ext = path.extname(req.file.originalname).toLowerCase();
                    var targetPath = path.resolve('./public/upload/' + req.body.name + ext);
        
                    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                        fs.rename(tempPath, targetPath, function(err){
                            if(err){
                                throw err;
                            }
                            var newImage = new ImageModel({
                                filename: `${req.body.name}${ext}`,
                                name: req.body.name,
                                description: req.body.description,
                                category: req.body.category,
                                author: req.body.author
                            });
                            newImage.save(
                                function(err, image){
                                    if(err){
                                        throw err
                                    }
                                    console.log('Successfully inserted image:' + image.filename);
                                    res.redirect('/images'); 
                                }
                            )
                        });
                    }else{
                        fs.unlink(tempPath, function(){
                            if(err){
                                throw err;
                            }
                            res.send(500, {error: 'Only image files are allowed.'});  //PLACEHOLDER
                        });
                    }
                }
            }
        )
    }
}