const post =require("../models/post_model")
const moment = require('moment');
const fs = require('fs');

const path = require('path');
module.exports.addpost =async(req,res)=>{
    return res.render("add_post")
}

module.exports.insertpostdata =async (req,res) => {
    var img = '';

    if (req.file) {
        img = post.postimg + "/" + req.file.filename;

    }

    req.body.postimage = img;
    req.body.current_date = moment().format('lll');
    req.body.username =req.user.name

   
    await post.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')
}

module.exports.view_post =async(req,res) =>{

    let postdata = await post.find();

    return res.render("view_post",{
        postdata:postdata
    })
}

module.exports.deletepostRecord= async(req,res)=>{
    let singleadmin = await post.findById(req.params.id);

    if (singleadmin) {

        var imgpath = path.join(__dirname, "..", singleadmin.postimage);
        await fs.unlinkSync(imgpath);

    }
    await post.findByIdAndDelete(req.params.id);

    return res.redirect('back'); 
}