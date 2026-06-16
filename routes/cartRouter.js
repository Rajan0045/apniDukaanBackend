const express = require("express");
const { addToCart , decreaseQuantity, removeFromCart} = require("../controllers/cartController");
const router = express.Router();

router.post("/addToCart/:_id", addToCart)
router.post("/dec-qty-product/:_id", decreaseQuantity)
router.post("/remove-product/:_id", removeFromCart)

module.exports = router;
