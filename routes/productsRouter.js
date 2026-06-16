const express = require("express");
const router = express.Router();
const propductModel = require("../models/product-model");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const { createProduct, getAllProducts, productDetails } = require("../controllers/ownerController");

router.post("/create", upload.single("image"), createProduct);
router.get("/list", getAllProducts);
router.get("/product/:_id", productDetails);

module.exports = router;
