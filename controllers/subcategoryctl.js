
const category =require("../models/category_model")
const subcategory = require("../models/subcategory_model")
const path = require('path');
const fs = require('fs');


module.exports.add_subcategory = async (req,res)=>{

    const categorydata =await category.find()

    return res.render("add_subcategory",{
        categorydata:categorydata
    })
}

module.exports.insertsubcategorydata = async (req,res) => {
   try{

    var img = '';

    if (req.file) {
        img = subcategory.subimg + "/" + req.file.filename;

    }

    req.body.subcategoryimage = img;

    req.body.stutas = true

   
    await subcategory.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')


   }catch(error){
         console.log(error)
        
   }
}

module.exports.view_subcategory = async (req,res)=>{
    let subcategorydata = await subcategory.find()

    return res.render("view_subcategory",{
        subcategorydata:subcategorydata
    })
}
module.exports.deleteSubcategoryRecord= async(req,res)=>{

    let singleadmin = await subcategory.findById(req.params.id);

    if (singleadmin) {

        var imgpath = path.join(__dirname, "..", singleadmin.subcategoryimage);
        await fs.unlinkSync(imgpath);

    }
    await subcategory.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}