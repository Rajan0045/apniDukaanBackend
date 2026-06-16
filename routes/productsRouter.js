const express = require("express");
const router = express.Router();
const propductModel = require("../models/product-model");

router.get("/", (req, res) => {
    res.send("done")
})

module.exports = router;
