const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const photosimg = "/uploads/photos";

const photosSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', photosimg))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) // Using originalname or unique name might be better
    }
});

photosSchema.statics.photosuploadimage = multer({ storage: storagedata }).single('image');

photosSchema.statics.photosimg = photosimg;

const photos = mongoose.model('photos', photosSchema);

module.exports = photos;
