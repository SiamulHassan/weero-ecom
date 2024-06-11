const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/productController");
//////////////////// CREATE USER
productRoute.post("/", productController.createProduct);
/////////////////// GET PRODUCTS
productRoute.get("/", productController.getProduct);
module.exports = productRoute;
