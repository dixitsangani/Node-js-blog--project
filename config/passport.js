const passport = require('passport')

const passportlocal = require('passport-local').Strategy

const admin = require("../models/admin_model");


passport.use(new passportlocal({

    usernameField: "email"

}, async (email, password, done) => {

    const userdata = await admin.findOne({ email: email });

    if (userdata) {

        if (password == userdata.password) {

            console.log(email, password);

            return done(null, userdata)
        }
        else {

            return done(null, false)
        }

    }
    else {
        return done(null, false)
    }

}))

passport.serializeUser(async(user,done)=>{
    console.log("serialize")
    
    console.log(user)

    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    
    let admindata = await admin.findById(id);
    console.log(admindata)

    if(admindata){
        return done(null,admindata)
    }
    else{
        return done(null,false)
    }
})

passport.authentica = function(req,res,next){

        if(req.isAuthenticated()){
            res.locals.Admins = req.user;
        }
        next();
   
}

passport.checkauth =function(req,res,next) {
    if(req.isAuthenticated()){
        next()
    }
    else{
        return res.redirect("/admin")
    }
}


module.exports = passport;