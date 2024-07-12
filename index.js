const express = require('express')
const app = express()
const port = 8001;
const cookieParser = require('cookie-parser')
const path = require('path')


const mogoose = require("mongoose");
 const db = require("./config/mongoose")
// mogoose.connect('mongodb+srv://dixitsangani303:1F0sB0f3WAAAWDgE@cluster0.envakky.mongodb.net/blogProject', {
//     useNewUrlParser: true
// })
//     .then((res) => {
//         console.log("Db is online connect");
//     })
//     .catch((err) => {
//         console.log(err)
//     })

app.use(express.urlencoded())

app.use(cookieParser())


const passport = require('passport')
const passportlocal = require("./config/passport")
const session = require('express-session');


const flash = require('connect-flash');
const connflash = require('./config/connect-flash')
app.use(flash());


const fs = require('fs');
const { connect } = require('http2');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'user_assets')));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({
    name: "yoyo",
    secret: "yo",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 100 * 50
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authentica);
app.use(connflash.setflash)

app.use('/', require('./routes/index'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));