const express = require("express");
const router = express.Router();
const isOwner = require("../middlewares/isOwner");
const { orderPlace, getMyOrders, orderDetails, getAllOrders } = require("../controllers/orderController");

router.post("/order-place", orderPlace);
router.get("/list", getMyOrders);
router.get("/all-orders", isOwner , getAllOrders);
router.get("/:_id", orderDetails);

module.exports = router;
