
const category = require ("../models/category_model")

module.exports.add_category = async (req,res)=>{
    return res.render("add_category")
}

module.exports.insertcategorydata = async (req,res) => {
    try{
        req.body.status = true;
        await category.create(req.body);
        req.flash('success',"category added")
        return res.redirect('back')

    }catch(error){
        console.log(error);
        return res.require('back')
    }
}

module.exports.view_category = async (req,res) => {

    var search = ""
    if (req.query.search) {
        search = req.query.search
    }

    var page = 0;
    var par_page = 10;
    if (req.query.page) {
        page = req.query.page
    }

    const allrecord = await category.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
           

        ]
    }).countDocuments();

    var totalpage = Math.ceil(allrecord/par_page)



    let categorydata = await category.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
        
        ]
    })
    .skip(page * par_page)
    .limit(par_page)

    return res.render("view_category",{
        categorydata:categorydata,
        search: search,
        totalpage:totalpage,
        currentpage: page


    })
}

module.exports.deletecategoryRecord=async(req,res)=>{
    try {
        await category.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error deleting record');
        return res.redirect('back');
    }
}