const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const imgpath = "/uploads/comment";

const commentSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    subid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
  
    message:{
        type: String,
        required:true
    },
    commentimage:{
        type:String,
        required:true
    },

    status:{
        type:Boolean,
        require:true
    },

    currentdate:{
        type:String,
        require:true
    }
 
   
})

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imgpath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

commentSchema.statics.uploadimage = multer({ storage: storagedata }).single('commentimage')

commentSchema.statics.ipath = imgpath;


const comment=mongoose.model('comment',commentSchema)

module.exports=comment;