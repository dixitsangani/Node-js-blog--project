const express = require("express");
const routes = express.Router();

const subcategory = require("../models/subcategory_model");
const SubcategoryCtl = require("../controllers/subcategoryctl"); 

routes.get("/add_subcategory", SubcategoryCtl.add_subcategory);

routes.post("/insertsubcategorydata", subcategory.subcategoryuploadimage, SubcategoryCtl.insertsubcategorydata);

routes.get("/view_subcategory", SubcategoryCtl.view_subcategory); 

routes.get("/deleteSubcategoryRecord/:id",SubcategoryCtl.deleteSubcategoryRecord)

module.exports = routes;
