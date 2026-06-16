const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    image: Buffer,
});

module.exports = mongoose.model("product", productSchema)