const express = require("express");
const routes = express.Router();

const CategoryController = require("../controllers/categoryctl");

routes.get("/add_category",CategoryController.add_category)

routes.post("/insertcategorydata",CategoryController.insertcategorydata)

routes.get("/view_category",CategoryController.view_category)

routes.get("/deletecategoryRecord/:id",CategoryController.deletecategoryRecord)



module.exports = routes;