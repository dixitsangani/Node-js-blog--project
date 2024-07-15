
const photos =require ("../models/photos_model")
const path = require('path');
const fs = require('fs');

module.exports.addphotos= async (req,res) => {
    return res.render("add_photos")
}

module.exports.insertphotos =async (req,res) => {
    try{
   
    var img = '';

    if (req.file) {
        img = photos.photosimg + "/" + req.file.filename;

    }

    req.body.image = img;

   
    await photos.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')

}catch(error){
    console.log(error);
    return res.require('back')
}

}

module.exports.viewphotos = async (req,res) => {
    try{
    let photosdata = await photos.find()

    return res.render("view_photos",{
        photosdata:photosdata
    })
}catch(error){
    console.log(error);
    return res.require('back')
}

}

module.exports.deleteAdminRecord =async(req,res)=>{
    try{
    
    let singleadmin = await photos.findById(req.params.id);

    if (singleadmin) {

        var imgpath = path.join(__dirname, "..", singleadmin.image);
        await fs.unlinkSync(imgpath);

    }
    await photos.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}catch(error){
    console.log(error);
    return res.require('back')
}
}