const express = require("express");
const routes = express.Router();

const post = require("../models/post_model")

const postcontroller =require('../controllers/postctl')



routes.get("/add_post",postcontroller.addpost)

routes.post("/insertpostdata",post.postuploadimage,postcontroller.insertpostdata)

routes.get("/view_post",postcontroller.view_post)

routes.get("/deletepostRecord/:id",postcontroller.deletepostRecord)



module.exports = routes;
