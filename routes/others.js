// Require necessary modules
const express = require("express");
const routes = express.Router();

// Require the controller
const othersController = require("../controllers/othersctl");


routes.get("/add_other", othersController.addothers);

routes.post("/insertothers",othersController.insertothers);

routes.get('/view_others',othersController.viewothers)

routes.get("/deleteOtherRecord/:id" ,othersController.deleteOtherRecord)

module.exports = routes;
