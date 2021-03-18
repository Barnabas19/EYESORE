var ImageModel = require('./models/image');
var async = require('async');

function database(records){
    if(records){
        var addToDatabase = function(item, next){ //item IS A MONGO DB RECORD / DOCUMENT...TO BE
            ImageModel.find(
                {filename: item.filename}, //CHECK IF THE RECORD ALREADY EXISTS IN THE DATABASE
                function(err, images){
                    if(err){
                        throw err;
                    }
                    if(images.length>0){   //IT ALREADY EXIST
                        console.log(`data duplication was attempted on ${item.filename}`)                      
                    }else{   //IT DOESN'T ALREADY EXISTS
                        var image = new ImageModel(item);
                        image.save(function(err, image){
                            if(err){
                                throw err;
                            }
                            console.log(`Successfully inserted ${image.filename}`);
                            next(err);
                        })  
                    }
                }
            )
        }
        async.each(records, addToDatabase,
        function(err){
            if(err){
                throw err;
            }
        });
    }
}

module.exports = database;
