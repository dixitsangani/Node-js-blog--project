
const photos =require ("../models/photos_model")
const path = require('path');
const fs = require('fs');

module.exports.addphotos= async (req,res) => {
    return res.render("add_photos")
}

module.exports.insertphotos =async (req,res) => {
   
    var img = '';

    if (req.file) {
        img = photos.photosimg + "/" + req.file.filename;

    }

    req.body.image = img;

   
    await photos.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')

}

module.exports.viewphotos = async (req,res) => {
    let photosdata = await photos.find()

    return res.render("view_photos",{
        photosdata:photosdata
    })

}

module.exports.deleteAdminRecord =async(req,res)=>{
    
    let singleadmin = await photos.findById(req.params.id);

    if (singleadmin) {

        var imgpath = path.join(__dirname, "..", singleadmin.image);
        await fs.unlinkSync(imgpath);

    }
    await photos.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}