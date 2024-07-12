const express = require("express");
const routes = express.Router();

const commentController = require("../controllers/commentsctl");

routes.get("/view_comments",commentController.view_comment)

routes.get("/deletecommentRecord/:id",commentController.deletecommentRecord)


module.exports = routes;