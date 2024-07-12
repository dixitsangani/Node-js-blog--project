
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const sliderimg = "/uploads/slider";

const sliderSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    sliderlink:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    sliderimage:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        require:true
    }
});

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', sliderimg))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) // Using originalname or unique name might be better
    }
});

sliderSchema.statics.slideruploadimage = multer({ storage: storagedata }).single('sliderimage');

sliderSchema.statics.sliderimg = sliderimg;

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
