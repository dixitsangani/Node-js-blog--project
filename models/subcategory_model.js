
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const subimg = "/uploads/subcategory";

const subcategorySchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
  
    description:{
        type: String,
        required:true
    },
    subcategoryimage:{
        type:String,
        required:true
    },
    subid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    status:{
        type:Boolean,
        require:true
    },
    
    currentdate:{
        type:String,
        require:true
    }
});

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', subimg))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) // Using originalname or unique name might be better
    }
});

subcategorySchema.statics.subcategoryuploadimage = multer({ storage: storagedata }).single('subcategoryimage');

subcategorySchema.statics.subimg = subimg;

const subcategory = mongoose.model('subcategory', subcategorySchema);

module.exports = subcategory;
