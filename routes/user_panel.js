const express = require("express");

const routes = express.Router();

const userpanel= require('../controllers/user_panelctl')

const comment =require("../models/comment_model")

routes.get('/',userpanel.home)

routes.get('/blog_singel/:id',userpanel.blog_singel)

routes.post("/usercomment",comment.uploadimage,userpanel.usercomment)

routes.get("/about",userpanel.about)

routes.get("/work-three-colums",userpanel.workthreecolums)


module.exports = routes