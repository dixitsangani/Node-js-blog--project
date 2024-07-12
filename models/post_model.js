
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const postimg = "/uploads/post";

const postSchema = mongoose.Schema({
    category:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    postimage:{
        type:String,
        required:true
    },
    current_date:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }

});

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', postimg))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) // Using originalname or unique name might be better
    }
});

postSchema.statics.postuploadimage = multer({ storage: storagedata }).single('postimage');

postSchema.statics.postimg = postimg;

const post = mongoose.model('post', postSchema);

module.exports = post;
