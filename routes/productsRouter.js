const express = require("express");
const router = express.Router();
const propductModel = require("../models/product-model");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const { createProduct, getAllProducts, productDetails, updateProduct, deleteProduct } = require("../controllers/ownerController");

router.post("/create", upload.single("image"), createProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.get("/list", getAllProducts);
router.get("/product/:_id", productDetails);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
