const express = require("express");
const routes = express.Router();

const offerController = require("../controllers/offerctl");


routes.get("/add_offer",offerController.addoffer)

routes.post("/insertoffer",offerController.insertoffer)

routes.get("/view_offer",offerController.viewoffer)

routes.get("/deleteOfferRecord/:id",offerController.deleteOfferRecord)
module.exports = routes;