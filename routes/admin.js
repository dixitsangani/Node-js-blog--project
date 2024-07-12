const express = require("express");

const admincontroller = require('../controllers/adminctl');
const admin = require("../models/admin_model");
const passport = require("passport");
const routes = express.Router();


routes.get("/", admincontroller.login)

routes.get('/dashboard', passport.checkauth, admincontroller.dashboard);

routes.get("/addadmin", passport.checkauth, admincontroller.addadmin)

routes.get("/viewadmin", passport.checkauth, admincontroller.viewadmin)

routes.post("/insertadmindata", admin.uploadimage, admincontroller.insertadmindata)

routes.get("/deleteAdminRecord/:id", admincontroller.deleteAdminRecord)

routes.get("/updateAdminRecord", passport.checkauth, admincontroller.updateAdminRecord)

routes.post("/editadmindata", passport.checkauth, admin.uploadimage, admincontroller.editadmindata)

routes.post("/loginform", passport.authenticate("local", { failureRedirect: "/" }), admincontroller.loginform)



routes.get('/logout', (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                return res.redirect('/admin/dashboard');
            } else {
                return res.redirect("/admin");
            }
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
})

// profile change pass

routes.get("/chage_password", passport.checkauth, admincontroller.chage_password)

routes.post("/changepass", passport.checkauth, admincontroller.changepass)

routes.get("/profail", passport.checkauth, admincontroller.profail)


// login forget pass

routes.get("/forgetpasswords", admincontroller.forgetpasswords)

routes.post("/fopass", admincontroller.fopass)

routes.get("/verifyotp", admincontroller.verifyotp)

routes.post("/otpverify", admincontroller.otpverify)

routes.post("/resetPass", admincontroller.resetPass)

routes.get("/loginforgetpass", admincontroller.loginforgetpass);

// active deactive

routes.get("/deactive/:id",admincontroller.deactive)
routes.get("/active/:id",admincontroller.active)

//deleteallrecoard

routes.post("/deleteallrecoard",admincontroller.deleteallrecoard)



//slider//

routes.use('/slider', passport.checkauth, require('./slider'))

routes.use('/others', passport.checkauth, require('./others'))

routes.use('/offer', passport.checkauth, require('./offer'))

routes.use('/photos', passport.checkauth, require('./photos'))

routes.use("/post",passport.checkauth,require('./post'))

routes.use("/comments",passport.checkauth,require('./comments'))

routes.use("/subcategory",passport.checkauth,require('./subcategory'))
routes.use("/category",passport.checkauth,require('./category'))

module.exports = routes