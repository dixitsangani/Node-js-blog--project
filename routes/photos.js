const express = require("express");
const routes = express.Router();

const photosController =require("../controllers/photosctl")

const photos =require ("../models/photos_model")


routes.get("/add_photos",photosController.addphotos)

routes.post("/insertphotos",photos.photosuploadimage,photosController.insertphotos)

routes.get("/view_photos",photosController.viewphotos)

routes.get("/deleteAdminRecord/:id",photosController.deleteAdminRecord)


module.exports = routes;