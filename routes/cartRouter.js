const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");
const router = express.Router();

router.post("/addToCart", addToCart)
router.post("/remove-product/:_id", removeFromCart)
router.get("/items", getCart)

module.exports = router;
