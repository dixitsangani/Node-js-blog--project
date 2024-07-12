
const mongoose = require('mongoose');


const offerSchema = mongoose.Schema({
    iname:{
        type:String,
        required: true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    

});



const offer = mongoose.model('offer', offerSchema);

module.exports = offer;
