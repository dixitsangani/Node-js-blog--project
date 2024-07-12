const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/adminPanel_blog")

const db = mongoose.connection.once("open", (err) => {
    if (err) {
        console.log("no")
        return false
    }
    console.log("ok")
})

module.exports = db;