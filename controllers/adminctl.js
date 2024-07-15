const admin = require('../models/admin_model');
const slider = require('../models/slider_model')
const path = require('path')
const imgpath = "/uploads";
const fs = require('fs');
const nodemailer = require("nodemailer");
const { log } = require('console');


// login
const login = async (req, res) => {

    const captchachooce = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    let captcha = "";

    for (let i = 0; i < 6; i++) {

        captcha += captchachooce.charAt(Math.round(Math.random() * captchachooce.length));

    }

    res.cookie('catpchacode', captcha)


    if (req.isAuthenticated()) {
        return res.redirect("/admin/dashboard")
    }
    else {
        return res.render("login", { captcha });
    }
}

// dashborad
const dashboard = async (req, res) => {

    var admindata =  await admin.find().countDocuments()
    var adminactivedata =  await admin.find().countDocuments({status:true})
    var admindeactivedata =  await admin.find().countDocuments({status:false})

    var sliderdata =  await slider.find().countDocuments()
    var slideractivedata =  await slider.find().countDocuments({status:true})
    var sliderdeactivedata =  await slider.find().countDocuments({status:false})

    return res.render("dashboard",{
        admindata:admindata,
        sliderdata:sliderdata,
        slideractivedata:slideractivedata,
        sliderdeactivedata:sliderdeactivedata,
        adminactivedata:adminactivedata,
        admindeactivedata:admindeactivedata
    });

}

// add admin
const addadmin = async (req, res) => {

    return res.render('add_admin')


}


// login Form
const loginform = async (req, res) => {
    try{
        if (req.cookies.catpchacode == req.body.catpchaCode) {
            console.log("captcha matched");
            req.flash('success', 'login succsesfully');
            return res.redirect("/admin/dashboard");
        }
        else {
            console.log("captcha not matched");
            console.log("invalid catpcha");
            return res.redirect("back");
    
        }

    }
    catch(error){
        consolelog(error)
    }
  
}



// view Admin
const viewadmin = async (req, res) => {
    try{

        
        var search = ""
        if (req.query.search) {
            search = req.query.search
        }
        
        var page = 0;
        var par_page = 2;
        if (req.query.page) {
            page = req.query.page
        }
        
        const allrecord = await admin.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
                
            ]
        }).countDocuments();
        
        var totalpage = Math.ceil(allrecord/par_page)
        
        
        
        
        var viewdata = await admin.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
                
            ]
        })
        .skip(page * par_page)
        .limit(par_page)
        
        return res.render('view_admin', {
            
            viewdata: viewdata,
            search: search,
            totalpage:totalpage
            
        });
        }
        catch(error){
            consolelog(error)
        }
    }

// insert
const insertadmindata = async (req, res) => {
try{

    console.log(req.file);
    console.log(req.body);

    var img = '';

    if (req.file) {
        img = admin.ipath + "/" + req.file.filename;

    }

    req.body.image = img;
    req.body.status=true

    req.body.name = req.body.fname + " " + req.body.lname;
    await admin.create(req.body);

    req.flash('success', 'add succsesfully');
    return res.redirect('back')
}  catch(error){
    consolelog(error)
}
}

// delete
const deleteAdminRecord = async (req, res) => {

    try{

   

    let singleadmin = await admin.findById(req.params.id);

    if (singleadmin) {

        var imgpath = path.join(__dirname, "..", singleadmin.image);
        await fs.unlinkSync(imgpath);

    }
    await admin.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}  catch(error){
    consolelog(error)
}
}

// update admin
const updateAdminRecord = async (req, res) => {
    try{


    const upatedata = await admin.findById(req.query.id);
    return res.render("edit_admin", {
        upatedata
    });

}  catch(error){
    consolelog(error)
}
}

// edit
const editadmindata = async (req, res) => {

    try{

    const editData = await admin.findById(req.body.id);

    console.log(req.body.id)
    if (req.file) {
        if (editData) {
            var ipath = path.join(__dirname, '..', editData.image);
            try {
                await fs.unlinkSync(ipath);

            }
            catch (err) {
                console.log(err);
            }
        }

        req.body.image = admin.ipath + "/" + req.file.filename;

    }
    else {
        const editData = await admin.findById(req.body.id);
        if (editData) {
            req.body.image = editData.image;
        }
    }

    req.body.name = req.body.fname + " " + req.body.lname;
    await admin.findByIdAndUpdate(req.body.id, req.body);
    console.log(req.body.id, req.body)
    return res.redirect("/admin/viewadmin")

}  catch(error){
    consolelog(error)
}
}

// profile
const profail = async (req, res) => {
    

    return res.render("profail")
}

// change pass
const chage_password = async (req, res) => {
    return res.render("change_pass");
}


const changepass = async (req, res) => {

    try{
    var dbpass = req.user.password
    if (dbpass == req.body.Currentpassword) {
        if (req.body.Currenttpassword != req.body.Newpassword) {
            if (req.body.Newpassword == req.body.Confirmpassword) {
                await admin.findByIdAndUpdate(req.user._id, {
                    password: req.body.Newpassword
                })
                return res.redirect('/admin/logout');
            }
        }
        else {
            console.log("password not change")
        }
    }
    else {
        console.log("sorry not change password");
        return res.redirect('back');
    }

    }  catch(error){
        consolelog(error)
    }

}

// -------------------------- forget ----------------------------- //

// forget pass
const forgetpasswords = async (req, res) => {
    return res.render("forgetpassword");
}

// fo pass otp
const fopass = async (req, res) => {

    try{
    const checkEmail = await admin.findOne({ email: req.body.email })
    if (checkEmail) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // TODO: replace user and pass values from <https://forwardemail.net>
                user: 'dixitpatel9309@gmail.com',
                pass: 'roabxdnyrwjovprz',
            },
        });

        var otp = Math.round(Math.random() * 10000)
        res.cookie('otp', otp);
        res.cookie('email', req.body.email);

        const msg = `<h1>shyam Institute</h1><b>OTP : ${otp}</b>`

        const info = await transporter.sendMail({
            from: 'dixitpatel9309@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: msg, // html body
        });


        return res.redirect("/admin/verifyotp")

    }
    else {
        console.log("invalid email")
        return res.redirect('back')
    }

}  catch(error){
    consolelog(error)
}
}

// verify otp
const verifyotp = async (req, res) => {
    return res.render("verifyotp")
}

// login forget pass
const loginforgetpass = async (req, res) => {
    return res.render("loginforgetpass")
}

//otp verify
const otpverify = async (req, res) => {
    try{
    if (req.body.otp == req.cookies.otp) {

        res.clearCookie("otp")
        return res.redirect("/admin/loginforgetpass");

    }
    else {
        console.log("otp not match")
        return res.redirect("back")
    }
}  catch(error){
    consolelog(error)
}
}


// login pass
const resetPass = async (req, res) => {

    try{
    console.log(req.body);
    console.log(req.cookies.email);

    if (req.body.npassword == req.body.cpassword) {

        var email = req.cookies.email;
        const checkEmail = await admin.findOne({ email: email });

        if (checkEmail) {
            let changepass = await admin.findByIdAndUpdate(checkEmail.id, {
                password: req.body.npassword
            })

            if (changepass) {
                res.clearCookie("email")
                return res.redirect('/admin');
            }
            else {
                console.log("password not changed")
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        console.log("invalid email")
        return res.redirect('back');
    }
}  catch(error){
    consolelog(error)
}

}

const deactive = async (req,res) =>{

    try{
    let deactivedata = await admin.findByIdAndUpdate(req.params.id,{status:false})
    if(deactivedata){
        req.flash('success', 'deactive succsesfully');
        return res.redirect("back")
    }
    else{
        return res.redirect("back")
    }
}  catch(error){
    consolelog(error)
}
}

const active = async (req,res) =>{

    try{
    let activedata = await admin.findByIdAndUpdate(req.params.id,{status:true})
    if(activedata){
        req.flash('success', 'active succsesfully');
        return res.redirect("back")
    }
    else{
        return res.redirect("back")
    }

}  catch(error){
    consolelog(error)
}
}

const deleteallrecoard =async (req ,res) => {

    try{

    const adminids = req.body.adminids;

    const d = await admin.deleteMany({ _id: { $in: adminids } });

    if(d){

        req.flash('success', 'deleteallrecoard succsesfully');
        return res.redirect("back")
    }
    else{
        return res.redirect("back")
    }
}  catch(error){
    consolelog(error)
}
 
}



module.exports = {
    dashboard, addadmin, viewadmin, insertadmindata, deleteAdminRecord, updateAdminRecord,
    editadmindata, login, loginform, chage_password, changepass, forgetpasswords, fopass, verifyotp, otpverify,
    loginforgetpass, profail, resetPass,deactive,active,deleteallrecoard
}