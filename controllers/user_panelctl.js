
const slidermodel = require("../models/slider_model");
const others = require("../models/others.model");
const offer = require("../models/offer_model")
const photos = require("../models/photos_model")
const post = require("../models/post_model")
const comment = require("../models/comment_model")
const category = require("../models/category_model")
const subcategory = require("../models/subcategory_model")


const admin = require("../models/admin_model")

const moment = require("moment")

module.exports.home = async (req, res) => {

    let sliderdata = await slidermodel.find()
    let othersdata = await others.find()
    let offerdata = await offer.find()
    let photosdata = await photos.find()
    let postdata = await post.find()



    return res.render('user_panel/home', {
        sliderdata: sliderdata,
        othersdata: othersdata,
        offerdata: offerdata,
        photosdata: photosdata,
        postdata: postdata,

    })
}

module.exports.blog_singel = async (req, res) => {
    try{

    const commentcount = await comment.find({ ids: req.params.id }).countDocuments();

    const commentdata = await comment.find({ ids: req.params.id })

    const allids = await post.find({}).select("_id:-1")

    let pos;

    allids.map((v, i) => {
        if (v.id == req.params.id) {
            pos = i
        }
    })



    const blogdata = await post.findById(req.params.id);

    //recesnt post 

    const resentpost = await post.find({}).sort({ _id: -1 }).limit(3)

    console.log(resentpost)

    return res.render("user_panel/post_blog", {
        blogdata: blogdata,
        allids: allids,
        pos: pos,
        commentcount: commentcount,
        commentdata: commentdata,
        resentpost: resentpost

    })
}catch(error){
    console.log(error);
    return res.require('back')
}
}

module.exports.usercomment = async (req, res) => {
    try{

    var img = '';


    if (req.file) {
        img = comment.ipath + "/" + req.file.filename;

    }

    req.body.currentdate = moment().format('lll');
    req.body.commentimage = img;
    req.body.status = true

    await comment.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')
}catch(error){
    console.log(error);
    return res.require('back')
}
}


module.exports.about = async (req, res) => {
    try{
    let adminrecord = await admin.find()
    return res.render("user_panel/about", {

        adminrecord: adminrecord

    })
}catch(error){
    console.log(error);
    return res.require('back')
}
}


module.exports.workthreecolums = async (req, res) => {
    try{
    const categorydata = await category.find()
    const subcategorydata = await subcategory.find()
    return res.render("user_panel/workthreecolums", {
        cut: categorydata,
        sub: subcategorydata
    })
}catch(error){
    console.log(error);
    return res.require('back')
}
}