const offer =require ("../models/offer_model")
const path = require('path');
const fs = require('fs');


module.exports.addoffer= async(req,res)=>{
    return res.render("add_offer")
}

module.exports.insertoffer = async (req,res)=>{
   
    await offer.create(req.body);

    req.flash('success', 'add succsesfully');

    return res.redirect('back')

}

module.exports.viewoffer = async (req,res ) =>{

    let offerdata = await offer.find()
    return res.render("view_offer",{
        offerdata:offerdata
    })

}

module.exports.deleteOfferRecord = async (req,res)=>{
    try {
        await offer.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error deleting record');
        return res.redirect('back');
    }
}
