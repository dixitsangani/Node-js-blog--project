const comment_model =require("../models/comment_model")
const fs = require('fs');

const path = require('path');

module.exports.view_comment = async (req,res) =>{
    var search="";
    if(req.query.search){
        search=req.query.search;
    }
    
    var page=0;
    var per_page=2;
    if(req.query.page){
        page=req.query.page
    }

    let allData=await comment_model.find({
        $or:[
            {name: {$regex:search, $options:'i'}},
            {email: {$regex:search, $options:'i'}}
        ]
    }).countDocuments();
    let totalPage =Math.ceil(allData/per_page);

    var viewData =await comment_model.find({
        $or:[
            {name: {$regex:search, $options:'i'}},
            {email: {$regex:search, $options:'i'}}
        ]
    })
    .skip(page*per_page)
    .limit(per_page).populate('subid').exec();

    console.log(viewData)

    return res.render("comments_view",{
        viewData:viewData,
        search : search,
        totalPage : totalPage,
        currentPage :page
    });
}

module.exports.deletecommentRecord= async(req,res)=>{
    try {
        await comment_model.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error deleting record');
        return res.redirect('back');
    }
}