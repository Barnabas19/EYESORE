var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    filename: {type: String},   
    name: {type: String},  //NAME WILL SERVE AS UNIQUE ID FOR AN IMAGE: FOR USER, FILENAME IS NAME + EXTENSION... FOR ADMIN, THEY BOTH COULD BE DIFFERENT
    description: {type: String},
    category: {type: String},
    author: {type: String},
    timestamp: {type: Date, 'default': Date.now()}
});

module.exports = mongoose.model('image', ImageSchema);