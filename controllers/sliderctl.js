const slider = require("../models/slider_model")

const path = require('path');

const fs = require('fs');

module.exports.addslider = (req, res) => {
    return res.render("add_slider")
}

module.exports.insertsliderdata = async (req, res) => {

    var img = '';

    if (req.file) {
        img = slider.sliderimg + "/" + req.file.filename;

    }

    req.body.sliderimage = img;

    req.body.stutas = true


    await slider.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')

}

module.exports.viewslider = async (req, res) => {

    var search = ""
    if (req.query.search) {
        search = req.query.search
    }

    var page = 0;
    var par_page = 4;
    if (req.query.page) {
        page = req.query.page
    }

    const allrecord = await slider.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { sliderlink: { $regex: search, $options: 'i' } }

        ]
    }).countDocuments();

    var totalpage = Math.ceil(allrecord / par_page)



    let sliderdata = await slider.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { sliderlink: { $regex: search, $options: 'i' } }

        ]
    })
        .skip(page * par_page)
        .limit(par_page)

    return res.render("view_slider", {
        sliderdata: sliderdata,
        search: search,
        totalpage: totalpage,
        currentpage: page


    })

}

module.exports.deletesliderRecord = async (req, res) => {

    let singleadmin = await slider.findById(req.params.id);

    if (singleadmin) {

        var sliderimg = path.join(__dirname, "..", singleadmin.sliderimage);
        await fs.unlinkSync(sliderimg);

    }
    await slider.findByIdAndDelete(req.params.id);

    return res.redirect('back');

}

module.exports.deactive = async (req, res) => {
    let deactivedata = await slider.findByIdAndUpdate(req.params.id, { status: false })
    if (deactivedata) {
        req.flash('success', 'deactive succsesfully');
        return res.redirect("back")
    }
    else {
        return res.redirect("back")
    }
}

module.exports.active = async (req, res) => {
    let activedata = await slider.findByIdAndUpdate(req.params.id, { status: true })
    if (activedata) {
        req.flash('success', 'active succsesfully');
        return res.redirect("back")
    }
    else {
        return res.redirect("back")
    }
}

