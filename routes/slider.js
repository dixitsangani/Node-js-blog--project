const express = require("express");
const routes = express.Router();
const sliderController = require("../controllers/sliderctl");

const slider =require("../models/slider_model")

routes.get("/addslider", sliderController.addslider);

routes.post("/insertsliderdata",slider.slideruploadimage ,sliderController.insertsliderdata)

routes.get("/viewslider",sliderController.viewslider)

routes.get("/deletesliderRecord/:id", sliderController.deletesliderRecord)

// active deactive

routes.get("/deactive/:id",sliderController.deactive)
routes.get("/active/:id",sliderController.active)



module.exports = routes;
