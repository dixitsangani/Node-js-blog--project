const express = require("express");

const routes = express.Router();

routes.use('/',require('./user_panel'))
routes.use('/admin',require('./admin'));


module.exports = routes