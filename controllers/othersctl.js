const others = require("../models/others.model")
const path = require('path');
const fs = require('fs');



module.exports.addothers = async (req, res) => {
    return res.render("add_others")
}

module.exports.insertothers = async (req, res) => {

    await others.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')

}

module.exports.viewothers = async (req, res) => {
    let othersdata = await others.find()
    return res.render("view_others", {
        othersdata: othersdata
    })
}

module.exports.deleteOtherRecord = async (req, res) => {
    try {
        await others.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error deleting record');
        return res.redirect('back');
    }
};